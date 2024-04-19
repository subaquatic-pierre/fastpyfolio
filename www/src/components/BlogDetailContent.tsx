import { Box, Chip, Container, Stack, Typography, TypographyVariant, useMediaQuery, useTheme } from '@mui/material';

import BlogAuthorBox from './BlogAuthorBox';
import EditorJSOutput from './EditorJSOutput';

import { Blog } from 'models/blog';

interface Props {
  blog: Blog;
}

const BlogDetailContent: React.FC<Props> = ({ blog }) => {
  return (
    <Box mb={5} minHeight={'60vh'}>
      <Container maxWidth="md">
        <Stack
          spacing={2}
          sx={(theme) => ({
            '& a': {
              color: theme.palette.primary.main
            },
            overflowX: 'hidden',
            wordWrap: 'break-word'
          })}
        >
          <BlogAuthorBox slug={blog.slug} category={blog.category} large date={new Date(blog.createdAt)} author={blog.authorId} />
          <EditorJSOutput data={blog.content} />
        </Stack>
      </Container>
    </Box>
  );
};

export default BlogDetailContent;
