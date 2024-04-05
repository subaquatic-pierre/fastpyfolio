import Image from 'next/image';
import { Avatar, Box, Stack, Typography } from '@mui/material';

import { UserProfile } from 'models/auth';

interface Props {
  author: string;
  date: Date;
  large?: boolean;
}

const BlogAuthorBox: React.FC<Props> = ({ author, date, large }) => {
  return (
    <Box display="flex" alignItems="center" py={large ? 2 : 0}>
      {/* Author image */}
      <Box
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
      </Box>
      <Box ml={2}>
        <Typography sx={{ fontSize: large && '1.1rem', fontWeight: large && 500 }}>{author}</Typography>
        <Typography sx={(theme) => ({ color: theme.palette.grey[600] })} variant={large ? 'body1' : 'caption'}>
          {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default BlogAuthorBox;
