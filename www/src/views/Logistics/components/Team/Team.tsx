/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

const Team = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item container alignItems={'center'} xs={12} md={6}>
          <Box>
            <Box marginBottom={2}>
              <Typography variant={'h4'} sx={{ fontWeight: 700 }} gutterBottom>
                Elevating API Experiences
              </Typography>
              <Typography color="text.secondary">
                Unlocking the potential of digital ecosystems with expertise in API design. Committed to developing intelligent solutions
                streamlining operations, driving profitability, and elevating service quality for businesses.
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {[
                'Harnessing the power of Python, Rust, and Node.js to create robust and efficient APIs, ensuring optimal performance and scalability.',
                'Embracing microservices architecture to design APIs that are modular, flexible, and easily maintainable, facilitating seamless integration and updates.',
                'Leveraging cutting-edge technologies to ensure APIs are fast, scalable, and responsive, providing a smooth and efficient user experience.',
                'Implementing efficient data management strategies within APIs, allowing for seamless data handling and processing, enhancing overall system performance.',
                'Continuously optimizing API designs to adapt to evolving business needs and technological advancements, ensuring long-term efficiency and effectiveness.'
              ].map((item, i) => (
                <Grid item xs={12} key={i}>
                  <Box component={ListItem} disableGutters width={'auto'} padding={0}>
                    <Box component={ListItemAvatar} minWidth={'auto !important'} marginRight={2}>
                      <Box component={Avatar} bgcolor={theme.palette.secondary.main} width={20} height={20}>
                        <svg width={12} height={12} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Box>
                    </Box>
                    <ListItemText primary={item} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height={1} width={1} display={'flex'} flexDirection={'column'}>
            <Box
              component={'img'}
              src={'/images/roundOrb.png'}
              alt="..."
              width={160}
              height={160}
              marginLeft={'calc(60% - 160px)'}
              zIndex={3}
              borderRadius={'100%'}
              boxShadow={4}
              data-aos={'fade-up'}
              sx={{
                display: {
                  xs: 'none',
                  md: 'block'
                },
                objectFit: 'cover',
                filter: theme.palette.mode === 'dark' ? 'brightness(0.5)' : 'none'
              }}
            />
            <Box
              component={'img'}
              width={200}
              height={200}
              src={'/images/helmetMan2.jpg'}
              alt="..."
              marginTop={'-8%'}
              zIndex={2}
              borderRadius={'100%'}
              boxShadow={4}
              data-aos={'fade-up'}
              sx={{
                display: {
                  xs: 'none',
                  md: 'block'
                },
                objectFit: 'cover',
                filter: theme.palette.mode === 'dark' ? 'brightness(0.5)' : 'none'
              }}
            />
            <Box
              component={'img'}
              width={300}
              height={300}
              src={'/images/helmetMan.jpg'}
              alt="..."
              marginTop={{ xs: 0, md: '-20%' }}
              marginLeft={{ xs: 'auto', md: 'calc(100% - 300px)' }}
              mr={{ xs: 'auto', md: 'none' }}
              zIndex={1}
              borderRadius={'100%'}
              boxShadow={4}
              data-aos={'fade-up'}
              sx={{
                objectFit: 'cover',
                filter: theme.palette.mode === 'dark' ? 'brightness(0.5)' : 'none'
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Team;
