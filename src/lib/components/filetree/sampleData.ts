import type { FileTreeNode } from "./types";

export const sampleFileTree: FileTreeNode[] = [
  {
    type: 'directory',
    name: 'src',
    isExpanded: true,
    children: [
      {
        type: 'directory',
        name: 'components',
        isExpanded: false,
        children: [
          { type: 'file', name: 'FileTree.svelte' },
          { type: 'file', name: 'FileNode.svelte' },
          { type: 'file', name: 'DirectoryNode.svelte' }
        ]
      },
      {
        type: 'directory',
        name: 'types',
        isExpanded: false,
        children: [{ type: 'file', name: 'index.ts' }]
      },
      {
        type: 'directory',
        name: 'routes',
        isExpanded: false,
        children: [
          {
            type: 'directory',
            name: 'filetree',
            isExpanded: false,
            children: [
              { type: 'file', name: '+page.svelte' }
            ]
          },
        ]
      },
      { type: 'file', name: 'app.html' }
    ]
  },
  {
    type: 'directory',
    name: 'public',
    isExpanded: false,
    children: [
      { type: 'file', name: 'index.html' },
      { type: 'file', name: 'favicon.ico' }
    ]
  },
  { type: 'file', name: 'package.json' },
  { type: 'file', name: 'tsconfig.json' },
  { type: 'file', name: 'README.md' }
]
