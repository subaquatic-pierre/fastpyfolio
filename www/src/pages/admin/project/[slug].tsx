import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography, Box, Stack, CircularProgress, Button, DialogTitle, Dialog, DialogActions } from '@mui/material';

// project imports
import Layout from 'layouts';

import Page from 'components/Page';
import MainCard from 'components/MainCard';
import { useRouter } from 'next/router';

import { Blog, reduceBlog } from 'models/blog';
import Editor from 'components/Editor';
import BlogForm from 'components/BlogForm';
import { blankBlog, blankProject } from 'utils/blankData';
import { SiteSettings } from 'models/settings';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { BlogApi, ProjectApi, RemoteApi, RequestOrigin } from 'lib/api';
import { Project } from 'models/project';
import ProjectForm from 'components/ProjectForm';

// ==============================|| Dashboard PAGE ||============================== //

interface PageProps {
  settings: SiteSettings;
}

const ProjectDetailPageAdmin: React.FC<PageProps> = ({ settings }) => {
  const [data, setData] = useState<Project>(null);
  const router = useRouter();
  const slug = router.query.slug;

  const handleLoad = async () => {
    const api = new ProjectApi();
    if (slug) {
      if (slug === 'new') {
        setData(blankProject);
      } else {
        const project = await api.getProject(slug as string);
        if (project) setData(project);
      }
    }
  };

  useEffect(() => {
    handleLoad();
  }, [slug]);

  return (
    <Layout admin>
      <Page title="Project Detail Page" settings={settings}>
        <Stack spacing={2}>
          <MainCard>
            {data ? (
              <Box>
                <ProjectForm data={data} />
              </Box>
            ) : (
              <Stack minHeight={300} justifyContent="center" alignItems="center">
                <CircularProgress />
              </Stack>
            )}
          </MainCard>
        </Stack>
      </Page>
    </Layout>
  );
};

export default ProjectDetailPageAdmin;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const api = new RemoteApi(RequestOrigin.NextBackend);
  const settings = await api.getSiteSettings();

  return {
    props: {
      settings
    }
  };
};
