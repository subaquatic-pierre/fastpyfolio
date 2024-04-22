import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { BlogApi } from 'lib/api';
import { Blog } from 'models/blog';
import Image from 'next/image';

const News = (): JSX.Element => {
  const [data, setData] = useState<Blog[]>([]);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  const handleLoad = async () => {
    const api = new BlogApi();

    const blogs = await api.getBlogs();

    setData(blogs.slice(0, 3));
  };

  const getDescriptionText = (text: string): string => {
    if (text.length > 200) {
      if (isMd) {
        return `${text.slice(0, 200)} ...`;
      } else {
        return `${text.slice(0, 100)} ...`;
      }
    } else {
      return text;
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography variant={'h4'} gutterBottom align={'center'} sx={{ fontWeight: 700 }}>
          Latest Updates
        </Typography>
        <Typography variant={'h6'} component={'p'} color={'text.secondary'} align={'center'}>
          Stay up-to-date with the latest news.
        </Typography>
      </Box>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={isMd ? 4 : 2} direction="column">
            {data.map((item, index) => (
              <Grid item xs={12} key={index} data-aos="fade-up" data-aos-delay={index * 200} data-aos-offset={100} data-aos-duration={600}>
                <Box component={Card} display={'flex'} flexDirection={{ xs: 'column', md: 'row' }}>
                  <Grid container sx={{ maxHeight: { md: 300 } }}>
                    <Grid item xs={12} md={4}>
                      <Box
                        sx={{
                          height: 222,
                          maxWidth: '100% !important',
                          overflow: 'hidden'
                        }}
                      >
                        <a href={`/blog/${item.slug}`}>
                          <Box
                            component="img"
                            sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
                            title={item.title}
                            src={item.featuredImageUrl}
                          />
                        </a>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <CardContent>
                        <Box>
                          <Typography variant="h6" gutterBottom color="text.primary">
                            {item.title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ maxHeight: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}
                            color="text.secondary"
                          >
                            {getDescriptionText(item.description)}
                          </Typography>
                        </Box>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                          <Button LinkComponent={Link} href={`/blog/${item.slug}`}>
                            Read More
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={isMd ? 4 : 2} direction="column">
            {/* <Grid item xs={12} data-aos="fade-up">
              <Box component={Card} bgcolor={'primary.main'}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="text.primary" sx={{ color: 'common.white' }}>
                    You like what you’re reading?
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ color: 'common.white' }}>
                    Get free online programing tips and resources delivered directly to your inbox.
                  </Typography>
                </CardContent>
              </Box>
            </Grid> */}
            <Grid item xs={12} data-aos="fade-up">
              <Box component={Card}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="text.primary">
                    Browse Updates, Stay in the Know
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    LinkComponent={Link}
                    href="/blog"
                    endIcon={
                      <Box
                        component={'svg'}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </Box>
                    }
                  >
                    View all
                  </Button>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default News;
