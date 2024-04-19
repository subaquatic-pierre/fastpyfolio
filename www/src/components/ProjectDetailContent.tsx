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
        <EditorJSOutput data={JSON.parse(project.content)} />
      </Container>
    </Box>
  );
};

export default ProjectDetailContent;
