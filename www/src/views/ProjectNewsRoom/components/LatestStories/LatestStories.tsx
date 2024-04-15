import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { Project } from 'models/project';

const mock = [
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img1.jpg',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    title: 'Eiusmod tempor incididunt',
    tags: ['UX', 'Design', 'Themes', 'Photography'],
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg'
    },
    date: '10 Sep'
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img4.jpg',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus',
    title: 'Sed ut perspiciatis',
    tags: ['UX', 'Design', 'Themes', 'Photography'],
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg'
    },
    date: '02 Aug'
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img2.jpg',
    description: 'Qui blanditiis praesentium voluptatum deleniti atque corrupti',
    title: 'Unde omnis iste natus',
    tags: ['UX', 'Design', 'Themes', 'Photography'],
    author: {
      name: 'Chary Smith',
      avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg'
    },
    date: '05 Mar'
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img3.jpg',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    title: 'Eiusmod tempor incididunt',
    tags: ['UX', 'Design', 'Themes', 'Photography'],
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg'
    },
    date: '10 Sep'
  }
];

interface Props {
  data: Project[];
}

const LatestStories: React.FC<Props> = ({ data }): JSX.Element => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={4}>
        {data.map((item, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Box
              component={'a'}
              href={''}
              display={'block'}
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`
                }
              }}
            >
              <Box component={Card} width={1} height={1}>
                <CardMedia
                  image={item.featuredImageUrl}
                  title={item.title}
                  sx={{
                    height: { xs: 300, md: 360 },
                    position: 'relative',
                    filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none'
                  }}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'}>
                    {item.tags.map((item) => (
                      <Chip key={item} label={item} size={'small'} sx={{ marginBottom: 1, marginRight: 1 }} />
                    ))}
                  </Box>
                  <Typography variant={'h6'} fontWeight={700} align={'center'} sx={{ textTransform: 'uppercase' }}>
                    {item.title}
                  </Typography>
                  <Box marginY={1}>
                    <Typography variant={'caption'} align={'center'} color={'text.secondary'} component={'i'}>
                      {item.createdAt}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" align={'center'}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LatestStories;
