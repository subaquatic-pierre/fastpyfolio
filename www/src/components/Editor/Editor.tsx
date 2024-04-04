import dynamic from 'next/dynamic';

import React, { useEffect, useRef } from 'react';

import EditorJS from '@editorjs/editorjs';

import { EDITOR_JS_TOOLS } from './tools';

const Editor = ({ initData, editorRef }) => {
  //Initialize editorjs
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorBlock',
        tools: EDITOR_JS_TOOLS,
        data: initData
      });
      editorRef.current = editor;
    }

    //Add a return function to handle cleanup
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return <div id="editorBlock" />;
};

export default Editor;
