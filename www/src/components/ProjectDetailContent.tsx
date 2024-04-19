import { Box, Chip, Container, Stack, Typography, TypographyVariant, useMediaQuery, useTheme } from '@mui/material';

import Output from 'editorjs-react-renderer';

import BlogAuthorBox from './BlogAuthorBox';

import { Project } from 'models/project';
import { randomUUID } from 'crypto';

interface Props {
  project: Project;
}

const ParagraphRenderer = ({ data, style, classNames, config }) => {
  let content = null;
  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(expression);

  if (content.match(regex) && content.startsWith('https')) {
    return <Box component="a" target="_blank" href={content} dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <Typography key={data.id}>
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </Typography>
  );
};
const HeaderRenderer = ({ data, style, classNames, config }) => {
  let content = null;

  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

  const variant = `h${data.level}` as TypographyVariant;

  return (
    <Typography key={data.id} variant={variant}>
      {content}
    </Typography>
  );
};

const renderers = {
  paragraph: ParagraphRenderer,
  header: HeaderRenderer
};

const ProjectDetailContent: React.FC<Props> = ({ project }) => {
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
          maxWidth={'100%'}
        >
          <Output renderers={renderers} data={JSON.parse(project.content)} />
        </Stack>
      </Container>
    </Box>
  );
};

export default ProjectDetailContent;
