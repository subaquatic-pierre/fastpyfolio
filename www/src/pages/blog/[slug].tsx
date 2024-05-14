import { ReactElement, useEffect, useState } from 'react';

// project import
import Main from 'layouts/Main';
import Page from 'components/Page';
import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Blog } from 'models/blog';
import { sleep } from 'utils/sleep';
import BlogDetailHero from 'components/BlogDetailHero';
import BlogDetailContent from 'components/BlogDetailContent';
import { BlogApi, RemoteApi, RequestOrigin } from 'lib/api';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPageContext } from 'next';
import { SiteSettings } from 'models/settings';

interface PageProps {
  settings: SiteSettings;
  blog: Blog | null;
}

const BlogDetailPage: React.FC<PageProps> = ({ settings }) => {
  const [data, setData] = useState<Blog | null>(null);
  const router = useRouter();
  const slug = router.query.slug;

  const loadData = async () => {
    const blogApi = new BlogApi();
    try {
      await sleep(2);
      const blog = await blogApi.getBlog(slug as string);
      if (!blog) router.push('/404');

      setData(blog);
    } catch {
      router.push('/404');
    }
  };

  useEffect(() => {
    if (slug) {
      loadData();
    }
  }, [slug]);

  return (
    <Main>
      <Page title={settings.title} settings={settings}>
        {data ? (
          <>
            <BlogDetailHero
              description={data.description}
              imageSrc={data.featuredImageUrl !== '' ? data.featuredImageUrl : '/images/default-blog-hero.png'}
              title={data.title}
            />

            <BlogDetailContent blog={data} />
          </>
        ) : (
          <Stack minHeight={'100vh'} justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        )}
      </Page>
    </Main>
  );
};

export default BlogDetailPage;

export const getStaticProps: GetServerSideProps<PageProps> = async (ctx) => {
  const api = new RemoteApi(RequestOrigin.NextBackend);
  const blogApi = new BlogApi(RequestOrigin.NextBackend);
  const settings = await api.getSiteSettings();
  const slug = ctx.params.slug as string;
  const blog = await blogApi.getBlog(slug);

  if (blog) {
    settings.title = `${blog.title} - Nebula Nexus`;
  }

  return {
    props: {
      settings,
      blog
    },
    revalidate: 10
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogApi = new BlogApi(RequestOrigin.NextBackend);
  let blogs = await blogApi.getBlogs();

  // Get the paths we want to pre-render based on posts
  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug }
  }));

  return { paths, fallback: 'blocking' };
};
