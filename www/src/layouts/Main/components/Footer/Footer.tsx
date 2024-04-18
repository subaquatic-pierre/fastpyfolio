import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useSettings from 'hooks/useSettings';
import { Stack } from '@mui/material';
import { GithubFilled, LinkedinFilled } from '@ant-design/icons';

const Footer = (): JSX.Element => {
  const settings = useSettings();
  const theme = useTheme();
  const { mode } = theme.palette;

  const linkSX = {
    color: mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    fontSize: '0.875rem',
    fontWeight: 400,
    opacity: '0.6',
    cursor: 'pointer',
    '&:hover': {
      opacity: '1'
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} sm={4}>
        <Box display={'flex'} component={Link} href="/" title={settings.title} height={{ xs: 60, md: 80 }} width={{ xs: 60, md: 100 }}>
          {/* TODO: Get logo from CMS */}
          <Box
            sx={{
              objectFit: 'contain'
              // ...(mode === 'dark' && {
              //   WebkitFilter: 'brightness(0) invert(1)',
              //   filter: 'brigtness(0) invert(1)'
              // })
            }}
            component={'img'}
            src={settings.logo}
            height={1}
            width={1}
          />
        </Box>
      </Grid>
      <Grid item xs={9} sm={6}>
        <Stack direction="row" width="100%" height={'100%'} alignItems="center">
          <Typography textAlign={'center'}>Nebula Nexus - Unleashing Innovation in the Cloud</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={2}>
        <Stack spacing={1} direction="row" width="100%" height={'100%'} alignItems="center" justifyContent={'center'}>
          <Link underline="none" href="https://www.linkedin.com/in/subaquatic-pierre/" target="_blank" sx={linkSX}>
            <LinkedinFilled style={{ fontSize: '200%' }} />
          </Link>
          <Link underline="none" href="https://github.com/subaquatic-pierre" target="_blank" sx={linkSX}>
            <GithubFilled style={{ fontSize: '200%' }} />
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography maxWidth={800} align={'center'} variant={'caption'} color="text.secondary" component={'p'}>
            When you visit or interact with this site, services or tools, we or our authorized service providers may use cookies for storing
            information to help provide you with a better, faster and safer experience and for marketing purposes.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Footer;
