import { Box, Button, Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { Ref, useRef, useState } from 'react';
import { API } from '@editorjs/editorjs';
const Editor = dynamic(() => import('./Editor'), { ssr: false });
import EditorJS from '@editorjs/editorjs';

interface Props {
  initData: object;
  editorRef: Ref<EditorJS>;
}

const EditorWrapper: React.FC<Props> = ({ initData, editorRef }) => {
  return (
    <Box
      sx={(theme) => ({
        '& .ce-block__content': {
          maxWidth: '88%'
        },
        '& .ce-toolbar__content': {
          maxWidth: '88%'
        },
        '& .codex-editor__redactor': {
          paddingTop: '8px',
          paddingBottom: '50px'
        },
        color: theme.palette.text.primary
      })}
    >
      <Stack alignItems="space-between" minHeight={300} spacing={2}>
        <Box>
          <Editor editorRef={editorRef} initData={initData} />
        </Box>
      </Stack>
    </Box>
  );
};

export default EditorWrapper;
