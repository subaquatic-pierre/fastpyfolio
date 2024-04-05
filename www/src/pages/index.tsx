import Page from 'components/Page';
import Main from 'layouts/Main';
import { RemoteApi, RequestOrigin } from 'lib/fetch';
import { SiteSettings } from 'models/settings';
import { GetStaticProps } from 'next';
import React from 'react';
import Logistics from 'views/Logistics';

interface PageProps {
  settings: SiteSettings;
}

const IndexPage: React.FC<PageProps> = ({ settings }): JSX.Element => {
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
  const api = new RemoteApi(RequestOrigin.NextBackend);
  const settings = await api.getSiteSettings();

  return {
    props: {
      settings
    },
    revalidate: 10
  };
};
