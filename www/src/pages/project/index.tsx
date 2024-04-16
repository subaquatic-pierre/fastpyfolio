import Page from 'components/Page';
import Main from 'layouts/Main';
import { ProjectApi, RemoteApi, RequestOrigin } from 'lib/api';
import { SiteSettings } from 'models/settings';
import { GetStaticProps } from 'next';
import React from 'react';
import ProjectNewsRoom from 'views/ProjectNewsRoom';
import Logistics from 'views/Logistics';
import { Project } from 'models/project';

interface PageProps {
  settings: SiteSettings;
  projects: Project[];
}

const IndexPage: React.FC<PageProps> = ({ settings, projects }): JSX.Element => {
  return (
    <Main colorInvert={true}>
      <Page settings={settings} title={settings.title}>
        <ProjectNewsRoom data={projects} />
      </Page>
    </Main>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const api = new RemoteApi(RequestOrigin.NextBackend);
  const projectApi = new ProjectApi(RequestOrigin.NextBackend);

  const settings = await api.getSiteSettings();

  settings.title = `Digital Showcase - Nebula Nexus`;
  const projects = await projectApi.getProjects();

  return {
    props: {
      settings,
      projects
    },
    revalidate: 10
  };
};
