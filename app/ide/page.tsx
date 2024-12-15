'use client';

import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import Terminal from './Terminal';
import 'xterm/css/xterm.css';
import Split from 'react-split';
import FileTree from './tree';


const Page = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [fileTree, setFileTree] = useState<any>();

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName);
    setEditorContent(`// You opened ${fileName}\nconsole.log('Hello, world!');`);
  };

  const getFileTree = async () => {
    const response = await fetch("http://localhost:9000/files");
    const result = await response.json();
    setFileTree(result.tree);
  };

  useEffect(() => {
    getFileTree()
  }, [])
  

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex h-12 bg-gray-800 text-white items-center px-4">
        <span className="text-lg font-bold">Code Burst</span>
      </div>
      {/* Split between Sidebar and Editor */}
      <Split className="split flex-grow" sizes={[25, 75]} minSize={200} gutterSize={8}>
        {/* Sidebar */}
        <div className="bg-gray-900 text-gray-300 p-4">
          <FileTree tree={fileTree}/>
        </div>
        {/* Editor and Terminal */}
        <div className="flex flex-col flex-grow bg-gray-800">
          {/* Editor */}
          <div className="flex-grow">
            <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage="typescript"
              value={editorContent}
              onChange={(value) => setEditorContent(value || '')}
            />
          </div>
          {/* Terminal */}
          <div className="bg-gray-900" style={{ height: 150 }}>
            <Terminal />
          </div>
        </div>
      </Split>
    </div>
  );
};

export default Page;
