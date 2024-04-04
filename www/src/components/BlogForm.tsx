import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  DialogTitle,
  Dialog,
  DialogActions
} from '@mui/material';
import { API } from '@editorjs/editorjs';
// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Blog } from 'models/blog';
import { FormFiles } from 'types/dropzone';

import Editor from 'components/Editor';
import { getBlogBySlug } from 'lib/clientFetch';
import { slugify } from 'utils/slug';
import useAuth from 'hooks/useAuth';
import EditorJS from '@editorjs/editorjs';
import { ApiMethod, apiReqWithAuth } from 'lib/api';
import { LIST_BLOG, GET_BLOG_BY_ID } from 'lib/endpoints';
import { useRouter } from 'next/router';
import SingleFileUpload from 'components/Dropzone/SingleFile';
import { uploadBlogImage } from 'lib/upload';
import { getInitialFile } from 'utils/upload';

interface Props {
  blogData: Blog;
}

const emptyFiles: FormFiles = {
  image: {
    files: [],
    error: ''
  }
};

const BlogForm: React.FC<Props> = ({ blogData }) => {
  const [selectedId, setSelected] = useState<number>(null);
  const router = useRouter();
  const { user } = useAuth();
  const editorRef = useRef<EditorJS>();
  const [submitErrors, setSubmitErrors] = useState<any>({});
  const [files, setFiles] = useState<FormFiles>(emptyFiles);

  const validation = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    slug: Yup.string()
      .max(255)
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/gim, { message: 'Slug is not valid' })
      .required('Slug is required'),
    description: Yup.string()
  });

  const formik = useFormik({
    initialValues: blogData,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: () => {}
  });

  const handleFileUpload = (field: string, value: any) => {
    setFiles((old) => ({ ...old, [field]: { files: value, error: '' } }));
  };

  const loadInitialFiles = async () => {
    const files = { ...emptyFiles };

    if (blogData && blogData.featuredImageUrl) {
      files.image = await getInitialFile('blog-image', blogData.featuredImageUrl);

      setFiles(files);
    }
  };

  const handleSaveClick = async () => {
    // ensure slug is not 'new'
    if (formik.values.slug === 'new') {
      setSubmitErrors({ slug: "Slug cannot be 'new'" });
      return;
    }

    // validate form
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      setSubmitErrors(errors);
      return;
    }

    const prevBlog = await getBlogBySlug(blogData.slug);

    // check that slug is not already taken
    // first if checks that new blog does not use same slug as an existing blog
    // second check is to ensure if the blog is being updated only same blog can have same slug
    if ((prevBlog && blogData.id === -1) || (prevBlog && prevBlog.id !== blogData.id)) {
      setSubmitErrors({ slug: 'Slug already used' });
      dispatch(
        openSnackbar({
          open: true,
          message: 'There was an error, please check input errors',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );

      return;
    }

    if (editorRef.current) {
      const editor = editorRef.current;
      const blogContent = await editor.save();

      let endpoint = LIST_BLOG();
      let method: ApiMethod = 'POST';
      let message = 'Blog created successfully';
      let featuredImageUrl = '';

      // update endpoint, method and success message if blog is update
      if (blogData.id !== -1) {
        endpoint = GET_BLOG_BY_ID(blogData.id);
        method = 'PUT';
        message = 'Blog updated successfully';
      }

      try {
        if (files.image.files) {
          const res = await uploadBlogImage(files, `${user.id}`);
          featuredImageUrl = res?.image?.url ?? '';
        }
      } catch (e) {
        dispatch(
          openSnackbar({
            open: true,
            message: `There was an error uploading image, ${e.message}`,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
        return;
      }

      try {
        const data = {
          ...formik.values,
          content: JSON.stringify(blogContent),
          author: user.email,
          featuredImageUrl,
          // only add default seo data if is new blog create
          ...(blogData.id === -1 && {
            seo: { title: formik.values.title, description: formik.values.description, image: featuredImageUrl }
          })
        };

        // remove id field from formik data before api call
        delete data.id;

        await apiReqWithAuth({
          endpoint,
          method,
          data: { data }
        });

        dispatch(
          openSnackbar({
            open: true,
            message,
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );

        router.push(`/admin/blog/${formik.values.slug}`);
      } catch (e) {
        console.log(e.message);

        dispatch(
          openSnackbar({
            open: true,
            message: 'There was an error, please check input errors',
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
        return;
      }
    } else {
      console.log('No data');
      dispatch(
        openSnackbar({
          open: true,
          message: 'There was an error, please check input errors',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  };

  const handleDeleteClick = async () => {
    let message = 'Blog Deleted';
    let color = 'success';

    try {
      if (!selectedId) {
        throw new Error('No blog selected');
      }
      await apiReqWithAuth({ endpoint: GET_BLOG_BY_ID(selectedId), method: 'DELETE' });
      router.push('/admin/blog');
    } catch (e) {
      message = 'There was an error deleting the blog';
      color = 'error';
    }

    setSelected(null);

    dispatch(
      openSnackbar({
        open: true,
        message,
        variant: 'alert',
        alert: {
          color
        },
        close: false
      })
    );
  };

  const handleLoad = async () => {
    await loadInitialFiles();
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    delete submitErrors[e.target.name];
    setSubmitErrors(submitErrors);
    const slugTouched = formik.touched.slug;
    if (e.target.name === 'title' && !slugTouched && blogData.id === -1) {
      formik.setFieldValue('slug', slugify(e.target.value));
    }
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Stack spacing={1.25}>
            <SingleFileUpload
              id="image"
              setFieldValue={handleFileUpload}
              title="Featured Image"
              file={files.image.files}
              error={!!files.image.error}
            />
            {files.image && files.image.error && (
              <FormHelperText error id="blog-image">
                {files.image.error as string}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <OutlinedInput
              autoFocus
              id="title"
              value={formik.values.title}
              name="title"
              onChange={handleInputChange}
              placeholder="Title"
              fullWidth
              error={!!submitErrors.title}
            />
            {!!submitErrors.title && (
              <FormHelperText error id="standard-weight-helper-text-title">
                {submitErrors.title}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor="slug">Slug</InputLabel>
            <OutlinedInput
              id="slug"
              value={formik.values.slug}
              name="slug"
              onBlur={formik.handleBlur}
              onChange={handleInputChange}
              placeholder="Slug"
              fullWidth
              error={!!submitErrors.slug}
            />
            {!!submitErrors.slug && (
              <FormHelperText error id="standard-weight-helper-text-title">
                {submitErrors.slug}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <OutlinedInput
              multiline
              rows={5}
              id="description"
              value={formik.values.description}
              name="description"
              onChange={handleInputChange}
              placeholder="Description"
              fullWidth
              error={!!submitErrors.description}
            />
            {submitErrors && (
              <FormHelperText error id="standard-weight-helper-text-description">
                {submitErrors.description}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="content">Content</InputLabel>
            <Box
              sx={(theme) => ({
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '5px',
                '&:hover': {
                  borderColor: theme.palette.primary.light
                }
              })}
            >
              <Editor editorRef={editorRef} initData={blogData.content} />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="end" spacing={1}>
            {blogData.id !== -1 && (
              <Button onClick={() => setSelected(blogData.id)} variant="contained" color="error">
                Delete
              </Button>
            )}
            <Button onClick={handleSaveClick} variant="contained" color="success">
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Dialog open={!!selectedId} onClose={() => setSelected(null)}>
        <DialogTitle>Are you sure you want to delete this?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClick} variant="contained" color="error">
            Yes
          </Button>
          <Button onClick={() => setSelected(null)} variant="contained" color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogForm;
