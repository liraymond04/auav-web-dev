export interface FileNode {
  type: 'file'
  name: string
  size?: number
}

export interface DirectoryNode {
  type: 'directory'
  name: string
  children: FileTreeNode[]
  isExpanded?: boolean
}

export type FileTreeNode = FileNode | DirectoryNode
