import React, { useEffect, useState } from 'react';
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
import { Project } from 'models/project';
import { Button, Card } from '@mui/material';

interface Props {
  data: Project[];
}

const defaultCount = 4;
const incAmount = 2;

const ProjectNewsRoom: React.FC<Props> = ({ data }): JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjectsCount, setFilteredProjectsCount] = useState(data.length);
  const [projectCount, setProjectCount] = useState(defaultCount);
  const [activeTags, setActiveTags] = useState(['Featured']);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  const handleMoreClick = () => {
    setProjectCount((old) => old + incAmount);
  };

  const handleTagClick = (tag: string) => {
    if (activeTags.indexOf(tag) === -1) {
      setActiveTags((old) => [...old, tag]);
    } else {
      setActiveTags((old) => old.filter((item) => item !== tag));
    }
  };

  const handleFilterProjects = (activeTags: string[], projectCount: number) => {
    if (activeTags.length === 0) {
      const filteredProjects = data;
      setProjects(filteredProjects.slice(0, projectCount));
      setFilteredProjectsCount(filteredProjects.length);
    } else {
      const filteredProjects = [];
      for (const tag of activeTags) {
        for (const project of data) {
          if (project.tags.indexOf(tag) !== -1 && filteredProjects.filter((item) => item.id === project.id).length === 0) {
            filteredProjects.push(project);
          }
        }
      }
      setProjects(filteredProjects.slice(0, projectCount));
      setFilteredProjectsCount(filteredProjects.length);
    }
  };

  useEffect(() => {
    handleFilterProjects(activeTags, projectCount);
  }, [activeTags, projectCount]);

  return (
    <>
      <Hero />
      <Container minHeight="500px" paddingY={'0 !important'}>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12} md={3}>
            <Box data-aos={'fade-right'} component={Card} variant={'outlined'} padding={2}>
              <Tags handleTagClick={handleTagClick} activeTags={activeTags} />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <LatestStories data={projects} />
          </Grid>
        </Grid>
        <Grid>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={{ xs: 'column', sm: 'row' }} my={4}>
            {filteredProjectsCount > projectCount && (
              <Box component={Button} onClick={handleMoreClick} variant="outlined" color="primary" size="large" marginLeft={2}>
                View More
              </Box>
            )}
          </Box>
        </Grid>
      </Container>

      <Container maxWidth={800} paddingY={'0 !important'}>
        <Divider />
      </Container>
    </>
  );
};

export default ProjectNewsRoom;
