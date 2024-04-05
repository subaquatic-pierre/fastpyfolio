import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Link from '@editorjs/link';
import Delimiter from '@editorjs/delimiter';
import CheckList from '@editorjs/checklist';
import ImageTool from '@editorjs/image';
import { uploadByFile } from 'utils/upload';
import { UploadApi } from 'lib/api';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true
  },
  checkList: CheckList,
  list: List,
  header: Header,
  delimiter: Delimiter,
  link: Link,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file, ...rest) {
          const uploadApi = new UploadApi();
          return uploadApi.uploadFile(file);
        }
      }
    }
  }
};
