import Image from 'next/image';
import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';

import { UserProfile } from 'models/auth';
import { formatDate } from 'utils/date';

interface Props {
  category: string;
  author: string;
  date: Date;
  large?: boolean;
}

const BlogAuthorBox: React.FC<Props> = ({ category, author, date, large }) => {
  return (
    <Stack spacing={2} direction="row" justifyContent="flex-end">
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
      <Chip label={`Category: ${category}`} />
      <Chip label={`Date: ${formatDate(date, 'DD-MMM-YYYY')}`} />
    </Stack>
  );
};

export default BlogAuthorBox;
