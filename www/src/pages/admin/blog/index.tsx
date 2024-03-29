import { useEffect, useMemo, useState } from 'react';
import ScrollX from 'components/ScrollX';

// material-ui
import {
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  TableBody,
  DialogTitle,
  TableHead,
  Table,
  CircularProgress,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  Typography,
  Box
} from '@mui/material';
import IconButton from 'components/@extended/IconButton';

// project imports
import Layout from 'layouts';
import useAuth from 'hooks/useAuth';
import { useTable, useFilters, usePagination, Column, HeaderGroup, Row, Cell } from 'react-table';
import { TablePagination } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { LIST_BLOG, GET_BLOG_BY_ID } from 'lib/endpoints';
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
import makeData from 'data/react-table';
import { Blog, reduceBlog, reduceBlogs } from 'models/blog';
import { apiReqWithAuth } from 'lib/api';
import Link from 'next/link';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getSiteSettings } from 'lib/serverFetch';
import { SiteSettings } from 'models/settings';

// ==============================|| Dashboard PAGE ||============================== //

const Dashboard = () => {
  return (
    <Layout admin>
      <Page title="Admin">
        <MainCard title="Sample Card">
          <Typography variant="body2">
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
          </Typography>
        </MainCard>
      </Page>
    </Layout>
  );
};

export default Dashboard;
