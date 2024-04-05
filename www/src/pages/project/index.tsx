import Page from 'components/Page';
import Main from 'layouts/Main';
import { RemoteApi, RequestOrigin } from 'lib/api';
import { SiteSettings } from 'models/settings';
import { GetStaticProps } from 'next';
import React from 'react';
import ProjectNewsRoom from 'views/ProjectNewsRoom';
import Logistics from 'views/Logistics';

interface PageProps {
  settings: SiteSettings;
  projects: any[];
}

const IndexPage: React.FC<PageProps> = ({ settings, projects }): JSX.Element => {
  return (
    <Main colorInvert={true}>
      <Page settings={settings} title={settings.title}>
        <ProjectNewsRoom />
      </Page>
    </Main>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const api = new RemoteApi(RequestOrigin.NextBackend);

  const settings = await api.getSiteSettings();
  const projects = await api.getProjects();

  return {
    props: {
      settings,
      projects
    },
    revalidate: 10
  };
};
