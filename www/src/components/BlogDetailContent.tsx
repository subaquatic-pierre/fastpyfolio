import { Box, Chip, Container, Stack, Typography, TypographyVariant, useMediaQuery, useTheme } from '@mui/material';

import Output from 'editorjs-react-renderer';

import BlogAuthorBox from './BlogAuthorBox';

import { Blog } from 'models/blog';

interface Props {
  blog: Blog;
}

const ParagraphRenderer = ({ data, style, classNames, config }) => {
  let content = null;
  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

  return (
    <Typography>
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </Typography>
  );
};
const HeaderRenderer = ({ data, style, classNames, config }) => {
  let content = null;

  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

  const variant = `h${data.level}` as TypographyVariant;

  return <Typography variant={variant}>{content}</Typography>;
};

const renderers = {
  paragraph: ParagraphRenderer,
  header: HeaderRenderer
};

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
          <BlogAuthorBox category={blog.category} large date={new Date(blog.createdAt)} author={blog.authorId} />
          <Output renderers={renderers} data={blog.content} />
        </Stack>
      </Container>
    </Box>
  );
};

export default BlogDetailContent;
