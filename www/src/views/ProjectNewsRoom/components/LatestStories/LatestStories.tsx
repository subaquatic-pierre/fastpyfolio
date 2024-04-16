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
import { formatDate } from 'utils/date';

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
              data-aos={'fade-up'}
              component={'a'}
              href={`/project/${item.slug}`}
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
                      {formatDate(new Date(item.createdAt), 'DD-MMM-YYYY')}
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
