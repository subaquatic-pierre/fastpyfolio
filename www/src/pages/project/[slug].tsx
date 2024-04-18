import { ReactElement, useEffect, useState } from 'react';

// project import
import Main from 'layouts/Main';
import Page from 'components/Page';
import { Box, Button, Chip, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Blog } from 'models/blog';
import { sleep } from 'utils/sleep';
import BlogDetailHero from 'components/BlogDetailHero';
import BlogDetailContent from 'components/BlogDetailContent';
import { BlogApi, ProjectApi, RemoteApi, RequestOrigin } from 'lib/api';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPageContext } from 'next';
import { SiteSettings } from 'models/settings';
import { Project } from 'models/project';
import ProjectDetailContent from 'components/ProjectDetailContent';
import ProjectDetailHero from 'components/ProjectDetailHero';
import ProjectDetailSidebar from 'components/ProjectDetailSidebar';

interface PageProps {
  settings: SiteSettings;
  project: Project | null;
}

const ProjectDetailPage: React.FC<PageProps> = ({ settings }) => {
  const [data, setData] = useState<Project | null>(null);
  const router = useRouter();
  const slug = router.query.slug;

  const loadData = async () => {
    const api = new ProjectApi();
    try {
      await sleep(2);
      const project = await api.getProject(slug as string);
      if (!project) router.push('/404');

      setData(project);
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
            <ProjectDetailHero
              description={data.description}
              imageSrc={data.featuredImageUrl !== '' ? data.featuredImageUrl : '/images/default-blog-hero.png'}
              title={data.title}
            />
            <Container>
              <Box mb={2}>
                {data.tags.map((item) => (
                  <Chip key={item} label={item} sx={{ margin: 0.5 }} />
                ))}
              </Box>
              <Grid container>
                <Grid item xs={12} order={{ md: 2, xs: 1 }} md={3}>
                  <ProjectDetailSidebar project={data} />
                </Grid>
                <Grid item xs={12} order={{ md: 1, xs: 2 }} md={9}>
                  <ProjectDetailContent project={data} />
                </Grid>
              </Grid>
            </Container>
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

export default ProjectDetailPage;

export const getStaticProps: GetServerSideProps<PageProps> = async (ctx) => {
  const api = new RemoteApi(RequestOrigin.NextBackend);
  const projectApi = new ProjectApi(RequestOrigin.NextBackend);
  const settings = await api.getSiteSettings();
  const slug = ctx.params.slug as string;
  const project = await projectApi.getProject(slug);

  if (project) {
    settings.title = `${project.title} - Nebula Nexus`;
  }

  return {
    props: {
      settings,
      project
    },
    revalidate: 10
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projectApi = new ProjectApi(RequestOrigin.NextBackend);
  let projects = await projectApi.getProjects();

  // Get the paths we want to pre-render based on posts
  const paths = projects.map((project) => ({
    params: { slug: project.slug }
  }));

  return { paths, fallback: 'blocking' };
};
