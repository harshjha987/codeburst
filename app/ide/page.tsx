// Page.js
"use client";

import React, { useEffect, useState } from "react";
import Terminal from "./Terminal";
import "xterm/css/xterm.css";
import Split from "react-split";
import FileTree from "./tree";
import Editor from "./Editor";
import socket from "@/components/globals/socket";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import CollaborativeEditor from "./CollaborativeEditor";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [fileTree, setFileTree] = useState<any>();

  const getFileTree = async () => {
    const response = await fetch("http://localhost:9000/files");
    const result = await response.json();
    setFileTree(result.tree);
  };

  const fetchFileContent = async (path: string) => {
    const response = await fetch(
      `http://localhost:9000/files/content?path=${path}`
    );
    const result = await response.json();
    setEditorContent(result.content);
  };

  const saveFile = async () => {
    if (!selectedFile) return;
    await fetch("http://localhost:9000/files/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: selectedFile, content: editorContent }),
    });
    socket.emit("file:change", { path: selectedFile, content: editorContent });
  };

  useEffect(() => {
    getFileTree();
  }, []);

  useEffect(() => {
    socket.on("file:refresh", getFileTree);
    return () => {
      socket.off("file:refresh", getFileTree);
    };
  }, []);

  useEffect(() => {
    if (selectedFile) {
      fetchFileContent(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveFile();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editorContent, selectedFile]);

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex h-12 bg-gray-800 text-white items-center px-4">
        <span className="text-lg font-bold">Code Burst</span>
        <button
          onClick={saveFile}
          className="ml-auto bg-blue-500 px-4 py-1 rounded text-white"
        >
          Save
        </button>
      </div>
      {/* Split between Sidebar and Editor */}
      <Split
        className="split flex-grow"
        sizes={[25, 75]}
        minSize={200}
        gutterSize={8}
      >
        {/* Sidebar */}
        <div className="bg-gray-900 text-gray-300 p-4">
          <FileTree
            onSelect={(path: any) => setSelectedFile(path)}
            tree={fileTree}
          />
        </div>
        {/* Editor and Terminal */}
        <div className="flex flex-col flex-grow bg-gray-800">
          {/* Editor */}
          {selectedFile && <p>{selectedFile.replaceAll("/", " > ")}</p>}
          <div className="flex-grow">
            <LiveblocksProvider
              publicApiKey={
                "pk_dev_CfqgJ_ja-o_6H5QxrB6Mf9AgITPtJUh8F3bKDRvmyNRgRh9b2Ej3XR_PTfovljJ8"
              }
            >
              <RoomProvider id="my-room">
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                  <CollaborativeEditor
                    content={editorContent}
                    onContentChange={(value) => setEditorContent(value)}
                  />
                </ClientSideSuspense>
              </RoomProvider>
            </LiveblocksProvider>
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
