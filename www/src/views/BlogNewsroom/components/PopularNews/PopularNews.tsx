/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Blog } from 'models/blog';
import Link from 'next/link';
import { formatDate } from 'utils/date';

interface Props {
  blogs?: Blog[];
}

const PopularNews: React.FC<Props> = ({ blogs = [] }) => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={4}>
        {blogs.map((item, i) => (
          <Grid key={i} item xs={12}>
            <Box
              data-aos={i % 2 === 0 ? `fade-left` : 'fade-right'}
              component={Card}
              width={1}
              height={1}
              borderRadius={0}
              boxShadow={0}
              display={'flex'}
              flexDirection={{
                xs: 'column',
                md: i % 2 === 0 ? 'row-reverse' : 'row'
              }}
              sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
            >
              <Box
                sx={{
                  width: { xs: 1, md: '50%' }
                }}
                component="a"
                href={`/blog/${item.slug}`}
              >
                <Box
                  component={'img'}
                  loading="lazy"
                  height={1}
                  width={1}
                  src={item.featuredImageUrl}
                  alt="..."
                  sx={{
                    objectFit: 'cover',
                    maxHeight: 360,
                    borderRadius: 2,
                    transition: 'all .2s ease-in-out',
                    filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                    '&:hover': {
                      transform: `translateY(-${theme.spacing(1 / 2)})`
                    }
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  paddingX: { xs: 1, sm: 2, md: 4 },
                  paddingY: { xs: 2, sm: 4 },
                  width: { xs: 1, md: '50%' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Typography variant={'h6'} fontWeight={700} sx={{ textTransform: 'uppercase' }}>
                  {item.title}
                </Typography>
                <Box marginY={1}>
                  <Typography variant={'caption'} color={'text.secondary'} component={'i'}>
                    {formatDate(new Date(item.createdAt), 'DD-MMM-YYYY')}
                  </Typography>
                </Box>
                <Typography color="text.secondary">{item.description}</Typography>
                <Box marginTop={2} display={'flex'} justifyContent={'flex-end'}>
                  <Button
                    LinkComponent={Link}
                    href={`/blog/${item.slug}`}
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
                    Read More
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularNews;
