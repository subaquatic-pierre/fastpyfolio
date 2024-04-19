import Output from 'editorjs-react-renderer';
import { Box, Typography, TypographyVariant, useTheme } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

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

const CodeRenderer = ({ data, style, classNames, config }) => {
  const theme = useTheme();

  return (
    <Box
      component={SyntaxHighlighter}
      language={'javascript'}
      style={vs2015}
      padding={`${theme.spacing(2)} !important`}
      borderRadius={2}
      margin={`${theme.spacing(0)} !important`}
      bgcolor={'#21325b !important'}
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
    }
  }
});

interface Props {
  data: any;
}

const EditorJSOutput: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  return <Output renderers={renderers} config={config} style={style(theme)} data={data} />;
};

export default EditorJSOutput;
