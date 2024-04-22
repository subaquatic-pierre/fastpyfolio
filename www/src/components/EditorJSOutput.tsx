import Output from 'editorjs-react-renderer';
import { Box, Stack, Typography, TypographyVariant, useTheme } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015, dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'types/config';

const ParagraphRenderer = ({ data, style, classNames, config }) => {
  let content = null;
  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

  if (content.startsWith('https')) {
    return (
      <a target="_blank" href={content}>
        {content}
      </a>
    );
  }

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

const CodeRenderer = ({ data, style, classNames, config }) => {
  const { mode } = useConfig();
  const theme = useTheme();

  return (
    <Box
      component={SyntaxHighlighter}
      language={'javascript'}
      style={mode === ThemeMode.DARK ? dark : vs2015}
      padding={`${theme.spacing(2)} !important`}
      borderRadius={2}
      margin={`${theme.spacing(0)} !important`}
      // bgcolor={mode === ThemeMode.DARK ? '#CACBCC !important' : '#21325b !important'}
    >
      {data.code}
    </Box>
  );
};

const renderers = {
  paragraph: ParagraphRenderer,
  header: HeaderRenderer,
  code: CodeRenderer
};

const config = {
  table: {}
};

const style = (theme) => ({
  table: {
    th: {
      backgroundColor: theme.palette.primary.light
    },
    td: {
      backgroundColor: 'transparent'
    },
    tr: {
      backgroundColor: 'transparent'
    },
    table: {
      backgroundColor: 'transparent'
    }
  }
});

interface Props {
  data: any;
}

const EditorJSOutput: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  return (
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
      <Output renderers={renderers} config={config} style={style(theme)} data={data} />
    </Stack>
  );
};

export default EditorJSOutput;
