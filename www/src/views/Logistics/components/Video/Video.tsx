import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Container from 'components/Container';
import { Stack } from '@mui/material';

const Video = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url(/images/cloudComponents.jpg)',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        width: '100%',
        minHeight: '300px',
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: '#11092d',
          opacity: 0.7,
          zIndex: 1
        }
      }}
    >
      <Container position={'relative'} zIndex={3}>
        <Box>
          <Stack marginBottom={4} alignItems="center">
            <Typography variant={'h4'} gutterBottom align={'center'} sx={{ fontWeight: 700, color: 'common.white' }}>
              Discover Cloud Components
            </Typography>
            <Typography
              variant={'h6'}
              component={'p'}
              color={'text.secondary'}
              maxWidth={400}
              align={'center'}
              sx={{ color: 'common.white' }}
            >
              Dive into the intricacies of cloud architecture. Explore the components that power our innovative solutions and unlock new
              possibilities for your digital infrastructure.
            </Typography>
          </Stack>
          {/* <Box
            sx={{
              backgroundImage: 'url(/images/cloudComponents.jpg)',
              backgroundPosition: 'center center',
              height: 324,
              maxWidth: 600,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconButton size={'large'}>
              <Box component={'svg'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width={50} height={50}>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </Box>
            </IconButton>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Video;
