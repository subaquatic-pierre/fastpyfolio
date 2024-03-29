import Page from 'components/Page';
import Main from 'layouts/Main';
import { getSiteSettings, getBlogs } from 'lib/serverFetch';
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
  return (
    <Main colorInvert>
      <Page settings={settings} title={settings.title}>
        <BlogNewsroom />
      </Page>
    </Main>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const settings = await getSiteSettings();
  const blogs = await getBlogs();

  return {
    props: {
      settings,
      blogs
    },
    revalidate: 10
  };
};
