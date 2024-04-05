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
import { blankBlog } from 'utils/blankData';
import { SiteSettings } from 'models/settings';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { BlogApi, RemoteApi, RequestOrigin } from 'lib/api';

// ==============================|| Dashboard PAGE ||============================== //

interface PageProps {
  settings: SiteSettings;
}

const BlogDetailPage: React.FC<PageProps> = ({ settings }) => {
  const [blogData, setBlogData] = useState<Blog>(null);
  const router = useRouter();
  const slug = router.query.slug;

  const handleLoad = async () => {
    const blogApi = new BlogApi();
    if (slug) {
      if (slug === 'new') {
        setBlogData(blankBlog);
      } else {
        const blog = await blogApi.getBlog(slug as string);
        if (blog) setBlogData(blog);
      }
    }
  };

  useEffect(() => {
    handleLoad();
  }, [slug]);

  return (
    <Layout admin>
      <Page title="Blog Detail Page" settings={settings}>
        <Stack spacing={2}>
          <MainCard>
            {blogData ? (
              <Box>
                <BlogForm blogData={blogData} />
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

export default BlogDetailPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const api = new RemoteApi(RequestOrigin.NextBackend);
  const settings = await api.getSiteSettings();

  return {
    props: {
      settings
    }
  };
};
