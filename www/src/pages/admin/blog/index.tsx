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
import { RemoteApi, RequestOrigin } from 'lib/api';
import { SiteSettings } from 'models/settings';
import { GET_BLOG } from 'lib/endpoints';

// ==============================|| BlogListPage PAGE ||============================== //

interface TableProps {
  columns: Column[];
  data: Blog[];
  top?: boolean;
  loadData: (pageIndex: number, pageSize: number) => void;
}

const ReactTable: React.FC<TableProps> = ({ columns, data, top, loadData }) => {
  const router = useRouter();
  const routerPageIndex: any = router.query.page;

  let index = 0;

  try {
    if (routerPageIndex) index = Number.parseInt(routerPageIndex as string) - 1;
  } catch (e) {
    console.log('Page is not valid integer');
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: index, pageSize: 25 }
    },
    useFilters,
    usePagination
  );

  useEffect(() => {
    loadData(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  return (
    <Stack>
      {top && (
        <Stack direction="row" sx={{ p: 2 }} justifyContent="space-between">
          <Button LinkComponent={Link} href="/admin/blog/new" variant="contained" color="primary">
            Create Blog
          </Button>
          <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
        </Stack>
      )}

      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: top ? 2 : 1 }}>
          {headerGroups.map((headerGroup, index) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column: HeaderGroup, i) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])} key={i}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row: Row<Blog>, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} href={row.original.slug} key={i}>
                {row.cells.map((cell: Cell, index) => (
                  <TableCell {...cell.getCellProps([{ className: cell.column.className }])} key={index}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Stack>
  );
};

interface PageProps {
  settings: SiteSettings;
}

const BlogListPage: React.FC<PageProps> = ({ settings }) => {
  const [selectedId, setSelected] = useState<string>(null);
  const theme = useTheme();
  const router = useRouter();
  const routerPageIndex = router.query.page;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Blog[]>([]);

  const handleDeleteClick = async () => {
    let message = 'Blog Deleted';
    let color = 'success';

    try {
      if (!selectedId) {
        throw new Error('No blog selected');
      }
      await apiReqWithAuth({ endpoint: GET_BLOG(selectedId), method: 'DELETE' });
      setLoading(true);
    } catch (e) {
      message = 'There was an error deleting the blog';
      color = 'error';
    }

    setSelected(null);

    dispatch(
      openSnackbar({
        open: true,
        message,
        variant: 'alert',
        alert: {
          color
        },
        close: false
      })
    );
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: 'ID',
      //   accessor: 'id'
      // },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ row }: { row: Row<Blog> }) => {
          return (
            <Box component={Link} sx={{ '&:hover': { cursor: 'pointer' } }} href={`/admin/blog/${row.original.slug}`}>
              {row.original.title}
            </Box>
          );
        }
      },
      {
        Header: 'Slug',
        accessor: 'slug'
      },
      {
        Header: 'Desciption',
        accessor: 'description'
      },
      {
        Header: 'Actions',
        disableSortBy: true,
        Cell: ({ row }: { row: Row<Blog> }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Edit">
                <Link href={`/admin/blog/${row.original.slug}`}>
                  <IconButton>
                    <EditFilled twoToneColor={theme.palette.error.main} />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="error" onClick={() => setSelected(row.original.id)}>
                  <DeleteFilled twoToneColor={theme.palette.error.main} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    []
  );

  const loadData = async (pageIndex: number, pageSize: number): Promise<void> => {
    const api = new RemoteApi();
    setLoading(false);

    const blogs = await api.getBlogs();

    setData(blogs);

    // update router with new page number
    // if (pageIndex >= 0) {
    //   router.replace({
    //     query: { ...router.query, page: pageIndex + 1 }
    //   });
    // }
  };

  useEffect(() => {
    if (loading) {
      if (Number.isInteger(routerPageIndex)) {
        loadData(Number.parseInt(routerPageIndex as string), 10);
      } else {
        loadData(0, 10);
      }
    }
  }, [loading]);

  return (
    <Layout admin>
      <Page title="Blogs" settings={settings}>
        <MainCard content={false}>
          {loading ? (
            <Stack height={300} justifyContent="center" alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <ScrollX>
              <ReactTable loadData={loadData} columns={columns} data={data} top />
            </ScrollX>
          )}
        </MainCard>
        <Dialog open={!!selectedId} onClose={() => setSelected(null)}>
          <DialogTitle>Are you sure you want to delete this?</DialogTitle>
          <DialogActions>
            <Button onClick={handleDeleteClick} variant="contained" color="error">
              Yes
            </Button>
            <Button onClick={() => setSelected(null)} variant="contained" color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Page>
    </Layout>
  );
};

export default BlogListPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const api = new RemoteApi(RequestOrigin.NextBackend);
  const settings = await api.getSiteSettings();

  return {
    props: {
      settings
    }
  };
};
