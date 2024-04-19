import Image from 'next/image';
import { Avatar, Box, Chip, IconButton, Stack, Typography } from '@mui/material';

import { UserProfile } from 'models/auth';
import { formatDate } from 'utils/date';
import useAuth from 'hooks/useAuth';
import { EditOutlined } from '@ant-design/icons';

interface Props {
  category: string;
  author: string;
  date: Date;
  slug: string;
  large?: boolean;
}

const BlogAuthorBox: React.FC<Props> = ({ category, author, date, slug }) => {
  const { role } = useAuth();
  return (
    <Box display="flex" flexDirection="row" justifyContent="flex-end">
      {/* Author image */}
      {/* <Box
        sx={{
          width: large ? 60 : 40,
          height: large ? 60 : 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Avatar />
      </Box> */}
      {/* <Typography sx={{ fontSize: large && '1.1rem', fontWeight: large && 500 }}>{author}</Typography> */}
      <Chip sx={{ margin: 0.5 }} label={`Category: ${category}`} />
      <Chip sx={{ margin: 0.5 }} label={`Date: ${formatDate(date, 'DD-MMM-YYYY')}`} />
      {role && (
        <Stack ml={2} direction="row" spacing={2}>
          <IconButton href={`/admin/blog/${slug}`}>
            <EditOutlined />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
};

export default BlogAuthorBox;
