/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const AboutBottom = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  return (
    <Box>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item container justifyContent={'center'} xs={12} md={6}>
          <Box position="relative" height={240} width={800}>
            <Box
              component={Image}
              alt=".."
              fill
              style={{ objectFit: 'cover' }}
              loading="lazy"
              src="/images/aboutBottom2.jpg"
              maxWidth={400}
            />
          </Box>
        </Grid>
        <Grid item container alignItems="center" xs={12} md={6}>
          <Box>
            <Typography
              variant="h4"
              data-aos={'fade-up'}
              gutterBottom
              sx={{
                fontWeight: 700
              }}
            >
              Cloud Orchestration and Site Reliability
            </Typography>
            <Typography data-aos={'fade-up'}>
              Incorporating Docker, Kubernetes, Prometheus, and Terraform, this approach to cloud orchestration and site reliability
              engineering ensures seamless management of infrastructure. Docker enables consistent application deployment. Kubernetes
              orchestrates containers for effortless scaling and management, while Prometheus monitors infrastructure health, and Terraform
              streamlines infrastructure provisioning. Together, these tools empower robust and reliable cloud orchestration, ensuring
              optimal site reliability and performance.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutBottom;
