import { ReactNode } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import AuthBackground from './AuthBackground';
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/Logo';
import { useRouter } from 'next/router';
import { WEBSITE_URL } from 'utils/const';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const LoginFormLayout = ({ children }: Props) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Grid
        container
        direction="column"
        justifyContent={{ xs: 'center', md: 'flex-end' }}
        sx={{
          minHeight: '100vh'
        }}
      >
        <Grid item xs={12} sx={{ ml: { md: 3 }, mt: 3, display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}>
          <Logo to={WEBSITE_URL} />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: 'calc(100vh - 210px)',
                sm: 'calc(100vh - 134px)',
                md: 'calc(100vh - 112px)'
              }
            }}
          >
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid> */}
      </Grid>
    </Box>
  );
};

export default LoginFormLayout;
