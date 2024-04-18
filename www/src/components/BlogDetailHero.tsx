import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';

interface Props {
  imageSrc: string;
  title: string;
  description: string;
}

const BlogDetailHero: React.FC<Props> = ({ imageSrc, title, description }) => {
  return (
    <Box position="relative" mb={4}>
      <Box
        sx={{
          position: 'relative',
          height: 500,
          maxWidth: '100%',
          overflow: 'hidden',
          objectPosition: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={title}
          sx={{ objectFit: 'cover', width: { sm: '100%' }, maxHeight: 500, overflow: 'hidden' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          backgroundColor: '#0C0C0C9C',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box maxWidth={700} mt={8}>
            <Typography variant="h2" mb={2} textAlign="center" color="white">
              {title}
            </Typography>
            <Typography variant="h6" textAlign="center" color="white">
              {description}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default BlogDetailHero;
