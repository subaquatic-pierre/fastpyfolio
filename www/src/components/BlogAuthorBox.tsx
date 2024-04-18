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
    </Box>
  );
};

export default BlogAuthorBox;
