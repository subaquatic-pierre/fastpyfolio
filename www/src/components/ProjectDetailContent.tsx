import { Box, Chip, Container, Stack, Typography, TypographyVariant, useMediaQuery, useTheme } from '@mui/material';

import EditorJSOutput from './EditorJSOutput';

import { Project } from 'models/project';

interface Props {
  project: Project;
}

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
          <EditorJSOutput data={JSON.parse(project.content)} />
        </Stack>
      </Container>
    </Box>
  );
};

export default ProjectDetailContent;
