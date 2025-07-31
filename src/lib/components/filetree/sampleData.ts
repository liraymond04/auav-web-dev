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
          { type: 'file', name: 'FileTree.svelte', extension: 'svelte' },
          { type: 'file', name: 'FileNode.svelte', extension: 'svelte' },
          { type: 'file', name: 'DirectoryNode.svelte', extension: 'svelte' }
        ]
      },
      {
        type: 'directory',
        name: 'types',
        isExpanded: false,
        children: [{ type: 'file', name: 'index.ts', extension: 'ts' }]
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
              { type: 'file', name: '+page.svelte', extension: 'svelte' }
            ]
          },
        ]
      },
      { type: 'file', name: 'app.html', extension: 'html' }
    ]
  },
  {
    type: 'directory',
    name: 'public',
    isExpanded: false,
    children: [
      { type: 'file', name: 'index.html', extension: 'html' },
      { type: 'file', name: 'favicon.ico', extension: 'ico' }
    ]
  },
  { type: 'file', name: 'package.json', extension: 'json' },
  { type: 'file', name: 'tsconfig.json', extension: 'json' },
  { type: 'file', name: 'README.md', extension: 'md' }
]
