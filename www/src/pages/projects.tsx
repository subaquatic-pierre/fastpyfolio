import Page from 'components/Page';
import Main from 'layouts/Main';
import { getSiteSettings, getProjects } from 'lib/serverFetch';
import { SiteSettings } from 'models/settings';
import { GetStaticProps } from 'next';
import React from 'react';
import Logistics from 'views/Logistics';

interface PageProps {
  settings: SiteSettings;
  projects: any[];
}

const IndexPage: React.FC<PageProps> = ({ settings, projects }): JSX.Element => {
  console.log(projects);
  return (
    <Main>
      <Page settings={settings} title={settings.title}>
        <Logistics />
      </Page>
    </Main>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const settings = await getSiteSettings();
  const projects = await getProjects();

  return {
    props: {
      settings,
      projects
    },
    revalidate: 10
  };
};
