import React, { useState } from 'react';

type FileNode = {
  name: string;
  type: 'folder' | 'file';
  children?: FileNode[];
};

type FileTreeProps = {
  tree: Record<string, any> | null;
};

const FileTree: React.FC<FileTreeProps> = ({ tree }) => {
  if (!tree) return <div>Loading...</div>; // Handle null or undefined tree

  const convertTree = (rawTree: Record<string, any>): FileNode[] => {
    return Object.entries(rawTree).map(([key, value]) => {
      if (value === null) {
        return { name: key, type: 'file' };
      } else {
        return { name: key, type: 'folder', children: convertTree(value) };
      }
    });
  };

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prevState) => ({
      ...prevState,
      [folderName]: !prevState[folderName],
    }));
  };

  const renderTree = (node: FileNode) => {
    const isExpanded = expandedFolders[node.name] || false;

    return (
      <div style={{ marginLeft: node.type === 'folder' ? 16 : 32 }} key={node.name}>
        {node.type === 'folder' ? (
          <div>
            <span
              onClick={() => toggleFolder(node.name)}
              style={{ cursor: 'pointer' }}
            >
              {isExpanded ? '📂' : '📁'} {node.name}
            </span>
            {isExpanded && node.children && (
              <div style={{ marginLeft: 16 }}>
                {node.children.map((child) => (
                  <React.Fragment key={child.name}>{renderTree(child)}</React.Fragment>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <span>📄 {node.name}</span>
          </div>
        )}
      </div>
    );
  };

  const convertedTree = convertTree(tree);

  return (
    <div>
      {convertedTree.length > 0 ? (
        convertedTree.map((node) => (
          <React.Fragment key={node.name}>{renderTree(node)}</React.Fragment>
        ))
      ) : (
        <div>No files available</div>
      )}
    </div>
  );
};

export default FileTree;
