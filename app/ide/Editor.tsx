// EditorComponent.js
'use client';

import React from 'react';
import { Editor } from '@monaco-editor/react';

interface EditorComponentProps {
  content: string;
  onContentChange: (value: string) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ content, onContentChange }) => {
  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage="typescript"
      value={content}
      onChange={(value) => onContentChange(value || '')}
    />
  );
};

export default EditorComponent;
