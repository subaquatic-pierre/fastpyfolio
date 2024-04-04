import MainCard from 'components/MainCard';
import { useFormik } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { ApiMethod, apiReqWithAuth } from 'lib/api';
import { LIST_BLOG, GET_SITE_SETTINGS, GET_BLOG_BY_ID } from 'lib/endpoints';
import { useRouter } from 'next/router';

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
import { SiteSettings } from 'models/settings';
import useSettings from 'hooks/useSettings';
import { getInitialFile } from 'utils/upload';
import { FormFiles } from 'types/dropzone';
import SingleFileUpload from 'components/Dropzone/SingleFile';
import { uploadBlogImage } from 'lib/upload';
import useAuth from 'hooks/useAuth';

const emptyFiles: FormFiles = {
  image: {
    files: [],
    error: ''
  }
};

interface Props {
  method: ApiMethod;
  endpoint: string;
  slug?: string;
  title?: string;
  description?: string;
  image?: string;
}

const SeoForm: React.FC<Props> = ({ endpoint, method, title, slug, description, image }) => {
  const { user } = useAuth();
  const [submitErrors, setSubmitErrors] = useState<any>({});
  const router = useRouter();
  const [files, setFiles] = useState<FormFiles>(emptyFiles);

  const isPageModelPage = () => {
    return slug !== undefined;
  };

  const validation = Yup.object().shape({
    slug: Yup.string().required(),
    title: Yup.string(),
    description: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      title: title ?? '',
      description: description ?? '',
      slug: slug ?? ''
    },
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: () => {}
  });

  const loadInitialFiles = async () => {
    const files = { ...emptyFiles };

    if (image) {
      files.image = await getInitialFile('image', image);
    }
    setFiles(files);
  };

  const handleFileUpload = (field: string, value: any) => {
    setFiles((old) => ({ ...old, [field]: { files: value, error: '' } }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    delete submitErrors[e.target.name];
    setSubmitErrors(submitErrors);
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const handleSaveClick = async () => {
    // only validate form if slug is needed
    if (slug) {
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        setSubmitErrors(errors);
        return;
      }
    }

    let message = 'Seo settings updated successfully';
    let imageUrl = '';

    try {
      if (files?.image?.files) {
        const res = await uploadBlogImage(files, `${user.id}`);
        imageUrl = res?.image?.url ?? '';
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
      const newData = { seo: { ...formik.values, image: imageUrl } };

      // if slug is present then is PageModel
      if (isPageModelPage()) {
        newData['title'] = formik.values.title;
        newData['slug'] = formik.values.slug;
      }

      console.log(newData);

      await apiReqWithAuth({
        endpoint: endpoint,
        method: method,
        data: { data: newData }
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

      if (isPageModelPage()) {
        router.push(`/admin/page`);
      } else {
        router.push(`/admin/blog`);
      }
    } catch (e) {
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
      // router.push(`/admin/blog`);
    }
  };

  const handleLoad = async () => {
    await loadInitialFiles();
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <MainCard title="Seo">
      <Grid container spacing={2}>
        {isPageModelPage() && (
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="slug">Page Slug</InputLabel>
              <OutlinedInput
                autoFocus
                id="slug"
                value={formik.values.slug}
                name="slug"
                onChange={handleInputChange}
                placeholder="Slug"
                fullWidth
                error={!!submitErrors.slug}
              />
              {!!submitErrors.slug && (
                <FormHelperText error id="standard-weight-helper-text-slug">
                  {submitErrors.slug}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor="title">Seo Title</InputLabel>
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
            <InputLabel htmlFor="description">Seo Description</InputLabel>
            <OutlinedInput
              id="description"
              multiline
              rows={4}
              value={formik.values.description}
              name="description"
              onChange={handleInputChange}
              placeholder="Description"
              fullWidth
              error={!!submitErrors.description}
            />
            {!!submitErrors.description && (
              <FormHelperText error id="standard-weight-helper-text-description">
                {submitErrors.description}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1.25}>
            <InputLabel htmlFor="image">Seo Image</InputLabel>
            <SingleFileUpload
              id="image"
              setFieldValue={handleFileUpload}
              title="Image"
              file={files.image.files}
              error={!!files.image.error}
            />
            {files.image && files.image.error && (
              <FormHelperText error id="image">
                {files.image.error as string}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button onClick={handleSaveClick} variant="contained" color="success">
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default SeoForm;
