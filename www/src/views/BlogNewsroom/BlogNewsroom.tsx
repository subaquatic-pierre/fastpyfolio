import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  FeaturedArticles,
  FooterNewsletter,
  Hero,
  LatestStories,
  MostViewedArticles,
  PopularNews,
  SidebarArticles,
  SidebarNewsletter,
  Tags,
  SearchBox
} from './components';

const BlogNewsroom = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  return (
    <>
      <Hero />
      <Container
        sx={{
          marginTop: '-6rem',
          position: 'relative',
          zIndex: 3,
          paddingY: '0 !important'
        }}
      >
        <SearchBox />
      </Container>
      <Container>
        <PopularNews />
      </Container>

      <Container maxWidth={800} paddingY={'0 !important'}>
        <Divider />
      </Container>
    </>
  );
};

export default BlogNewsroom;
