import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const mock = [
  {
    title: 'SQL Database',
    subtitle:
      'Employ PostgreSQL, a powerful SQL database management system, for structured data storage. Benefit from advanced querying capabilities, relational data modeling, and transactional integrity.',
    icon: '/images/postgresql.svg'
  },
  {
    title: 'NoSQL Database',
    subtitle:
      'Utilize MongoDB, a leading NoSQL database, for flexible and scalable storage of unstructured or semi-structured data. Embrace document-based data models, dynamic schema flexibility, and horizontal scaling, including time-series data management.',
    icon: '/images/mongodb.svg'
  },
  {
    title: 'Object Storage',
    subtitle:
      'Harness the power of object storage solutions like Amazon S3 and Google Cloud Storage for storing large volumes of unstructured data. Ensure durability, scalability, and cost-effectiveness for your storage needs.',
    icon: '/images/aws-s3.svg'
  }
];

const Integrations = (): JSX.Element => {
  return (
    <Box>
      <Stack marginBottom={4} alignItems="center">
        <Typography variant={'h4'} gutterBottom align={'center'}>
          Revolutionizing Data Management
        </Typography>
        <Typography maxWidth={600} variant={'h6'} component={'p'} color={'text.secondary'} align={'center'}>
          Introducing cutting-edge storage solutions tailored for modern business demands. Prioritizing security, availability, and
          scalability, these innovations redefine data management paradigms.
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        {mock.map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box
                component={'img'}
                width={{ xs: 60, md: 80 }}
                height={{ xs: 60, md: 80 }}
                marginBottom={2}
                src={item.icon}
                sx={{ filter: 'brightness(70%)' }}
              />
              <Typography variant={'h6'} gutterBottom align={'center'} sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>
              <Typography align={'center'}>{item.subtitle}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Integrations;
