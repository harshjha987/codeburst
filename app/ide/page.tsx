'use client';

import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import Terminal from './Terminal';
import 'xterm/css/xterm.css';
import Split from 'react-split';

const folders = [
  { name: 'src', files: ['index.tsx', 'app.tsx'] },
  { name: 'public', files: ['index.html'] },
  { name: 'styles', files: ['globals.css', 'tailwind.css'] },
];

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>(''); // Default empty

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName);
    setEditorContent(`// You opened ${fileName}\nconsole.log('Hello, world!');`);
  };

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
          {folders.map((folder) => (
            <div key={folder.name} className="mb-4">
              <div className="font-bold text-gray-200">{folder.name}</div>
              <ul className="pl-4">
                {folder.files.map((file) => (
                  <li
                    key={file}
                    className={`cursor-pointer ${
                      selectedFile === file ? 'text-blue-400' : 'text-gray-300'
                    } hover:text-white`}
                    onClick={() => handleFileClick(file)}
                  >
                    {file}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
