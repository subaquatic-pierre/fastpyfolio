import Page from 'components/Page';
import Main from 'layouts/Main';
import { RemoteApi, RequestOrigin } from 'lib/api';
import { SiteSettings } from 'models/settings';
import { GetStaticProps } from 'next';
import React from 'react';
import BlogNewsroom from 'views/BlogNewsroom';
import Logistics from 'views/Logistics';

interface PageProps {
  settings: SiteSettings;
  blogs: any[];
}

const IndexPage: React.FC<PageProps> = ({ settings, blogs }): JSX.Element => {
  console.log(blogs);
  return (
    <Main colorInvert>
      <Page settings={settings} title={settings.title}>
        <BlogNewsroom blogs={blogs} />
      </Page>
    </Main>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const api = new RemoteApi(RequestOrigin.NextBackend);
  const settings = await api.getSiteSettings();
  const blogs = await api.getBlogs();

  return {
    props: {
      settings,
      blogs
    },
    revalidate: 10
  };
};
