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
  DialogActions,
  Autocomplete,
  Chip,
  TextField
} from '@mui/material';
// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Blog } from 'models/blog';
import { FormFiles } from 'types/dropzone';

import Editor from 'components/Editor';
import { BlogApi, ProjectApi, UploadApi } from 'lib/api';
import { slugify } from 'utils/slug';
import useAuth from 'hooks/useAuth';
import EditorJS from '@editorjs/editorjs';
import { useRouter } from 'next/router';
import SingleFileUpload from 'components/Dropzone/SingleFile';
import { Project } from 'models/project';
import DatePicker from './DatePicker';

interface Props {
  data: Project;
}

const emptyFiles: FormFiles = {
  image: {
    files: [],
    error: ''
  }
};

const ProjectForm: React.FC<Props> = ({ data }) => {
  const imageChanged = useRef(false);
  const [dates, setDates] = useState({ createdAt: data.createdAt, updatedAt: data.updatedAt });
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [tags, setTags] = React.useState<string[]>(data.tags);
  const [selectedId, setSelected] = useState<string>(null);
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
    description: Yup.string().required('Description is required'),
    githubUrl: Yup.string(),
    wwwUrl: Yup.string()
  });

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: () => {}
  });

  const handleFileUpload = (field: string, value: any) => {
    imageChanged.current = true;
    setFiles((old) => ({ ...old, [field]: { files: value, error: '' } }));
  };

  const loadInitialFiles = async () => {
    const uploadApi = new UploadApi();
    const files = { ...emptyFiles };

    if (data && data.featuredImageUrl) {
      const filename = data.featuredImageUrl.split('/')[data.featuredImageUrl.split('/').length - 1];
      files.image = await uploadApi.getInitialFile(filename, data.featuredImageUrl);

      setFiles(files);
    }
  };

  const handleSaveClick = async () => {
    const api = new ProjectApi();
    const uploadApi = new UploadApi();
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

    try {
      const prevProject = await api.getProject(formik.values.slug);

      // check that slug is not already taken
      // first if checks that new blog does not use same slug as an existing blog
      // second check is to ensure if the blog is being updated only same blog can have same slug
      if (prevProject && prevProject.id !== data.id) {
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
    } catch (e) {}

    if (editorRef.current) {
      const editor = editorRef.current;
      const blogContent = await editor.save();
      let message = 'Project created successfully';
      let featuredImageUrl = data.featuredImageUrl;

      // update endpoint, method and success message if Project is update
      if (data.id !== '') {
        message = 'Project updated successfully';
      }

      try {
        if (files.image.files?.length === 1 && imageChanged.current) {
          const res = await uploadApi.uploadFile(files.image.files[0]);
          featuredImageUrl = res?.file?.url ?? data.featuredImageUrl;
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
        const newData = {
          ...formik.values,
          content: JSON.stringify(blogContent),
          authorId: user.id,
          featuredImageUrl,
          tags,
          ...(data.id && dates)
        };

        await api.saveProject(newData, data.id);

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

        router.push(`/admin/project/${formik.values.slug}`);
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
    const api = new ProjectApi();
    let message = 'Project Deleted';
    let color = 'success';

    try {
      if (!selectedId) {
        throw new Error('No project selected');
      }
      await api.deleteProject(selectedId);
      router.push('/admin/project');
    } catch (e) {
      message = 'There was an error deleting the project';
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

  const loadTags = async () => {
    const api = new ProjectApi();

    const tags = await api.getTags();
    setTagOptions(tags);
  };

  const handleLoad = async () => {
    await loadInitialFiles();
    await loadTags();
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    delete submitErrors[e.target.name];
    setSubmitErrors(submitErrors);
    const slugTouched = formik.touched.slug;
    if (e.target.name === 'title' && !slugTouched && data.id === '') {
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
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor="githubUrl">Github URL</InputLabel>
            <OutlinedInput
              id="githubUrl"
              value={formik.values.githubUrl}
              name="githubUrl"
              onBlur={formik.handleBlur}
              onChange={handleInputChange}
              placeholder="Github URL"
              fullWidth
              error={!!submitErrors.githubUrl}
            />
            {!!submitErrors.githubUrl && (
              <FormHelperText error id="standard-weight-helper-text-title">
                {submitErrors.githubUrl}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor="wwwUrl">Website URL</InputLabel>
            <OutlinedInput
              id="wwwUrl"
              value={formik.values.wwwUrl}
              name="wwwUrl"
              onBlur={formik.handleBlur}
              onChange={handleInputChange}
              placeholder="Website URL"
              fullWidth
              error={!!submitErrors.wwwUrl}
            />
            {!!submitErrors.wwwUrl && (
              <FormHelperText error id="standard-weight-helper-text-title">
                {submitErrors.wwwUrl}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        {data.id && (
          <>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="createdAt">Created At</InputLabel>
                <DatePicker
                  date={dates.createdAt}
                  dateKey="createdAt"
                  setDate={(newDate, key) => setDates((old) => ({ ...old, [key]: newDate }))}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="updatedAt">Updated At</InputLabel>
                <DatePicker
                  date={dates.updatedAt}
                  dateKey="updatedAt"
                  setDate={(newDate, key) => setDates((old) => ({ ...old, [key]: newDate }))}
                />
              </Stack>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="tags">Tags</InputLabel>
            <Autocomplete
              multiple
              id="tags"
              value={tags}
              onChange={(event, newValue) => {
                setTags(newValue.map((val) => val.toLowerCase()));
              }}
              options={tagOptions}
              freeSolo
              renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)}
              renderInput={(params) => <TextField {...params} placeholder="Tags" />}
            />
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
              <Editor editorRef={editorRef} initData={JSON.parse(data.content ?? '{}')} />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="end" spacing={1}>
            {data.id !== '' && (
              <Button onClick={() => setSelected(data.id)} variant="contained" color="error">
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
            data
          </Button>
          <Button onClick={() => setSelected(null)} variant="contained" color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectForm;
