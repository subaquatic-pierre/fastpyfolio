/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import PublicIcon from '@mui/icons-material/Public';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { formatDate } from 'utils/date';
import { Project } from 'models/project';
import { GithubFilled } from '@ant-design/icons';

const validationSchema = yup.object({
  email: yup.string().trim().email('Please enter a valid email address').required('Email is required.'),
  password: yup.string().required('Please specify your password').min(8, 'The password should have at minimum length of 8')
});

interface Props {
  project: Project;
}

const ProjectDetailSidebar: React.FC<Props> = ({ project }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  const initialValues = {
    email: '',
    password: ''
  };

  const onSubmit = (values) => {
    return values;
  };

  return (
    <Box mb={3} component={Card} variant={'outlined'} padding={2} bgcolor={'transparent'}>
      <Grid container spacing={4}>
        {isMd ? (
          <Grid item container justifyContent={'center'} xs={12}>
            <Box height={1} width={1} maxWidth={'80%'}>
              <Box
                component={'img'}
                src={'https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration2.svg'}
                width={1}
                height={1}
                sx={{
                  filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none'
                }}
              />
            </Box>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              marginBottom: 2
            }}
          >
            Project Details
          </Typography>
          <List>
            {project.githubUrl && (
              <ListItemButton href={project.githubUrl} target="_blank">
                <ListItemAvatar>
                  <Avatar>
                    <GithubFilled />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Github" />
              </ListItemButton>
            )}
            {project.wwwUrl && (
              <ListItemButton href={project.wwwUrl} target="_blank">
                <ListItemAvatar>
                  <Avatar>
                    <PublicIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Github" />
              </ListItemButton>
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetailSidebar;
