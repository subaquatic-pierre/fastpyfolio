import Page from 'components/Page';
import Main from 'layouts/Main';
import { BlogApi, RemoteApi, RequestOrigin } from 'lib/api';
import { SiteSettings } from 'models/settings';
import { GetStaticProps } from 'next';
import React from 'react';
import BlogNewsroom from 'views/BlogNewsroom';

interface PageProps {
  settings: SiteSettings;
  blogs: any[];
}

const IndexPage: React.FC<PageProps> = ({ settings, blogs }): JSX.Element => {
  return (
    <Main colorInvert>
      <Page settings={settings} title={settings.title}>
        <BlogNewsroom data={blogs} />
      </Page>
    </Main>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const api = new RemoteApi(RequestOrigin.NextBackend);
  const blogApi = new BlogApi(RequestOrigin.NextBackend);
  const settings = await api.getSiteSettings();
  const blogs = await blogApi.getBlogs();
  settings.title = `Blog - Nebula Nexus`;

  blogs.sort((a, b) => new Date(a.createdAt).getMilliseconds() - new Date(b.createdAt).getMilliseconds());

  return {
    props: {
      settings,
      blogs
    },
    revalidate: 10
  };
};
