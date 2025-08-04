export const usage_file_code = `<script lang="ts">
  let file_node: FileNode = $state({
    type: 'file',
    name: '+page.svelte',
  })
<\/script>

<FileNodeComponent
  node={file_node}
  depth={0}
  path={'routes/+page.svelte'}
/>`

export const def_file_code = `<!-- FileNode.svelte -->
<script lang="ts">
  const { node, depth, path } = $props()

  function handleClick() {
    console.log(path)
  }
<\/script>

<div
  onclick={handleClick}
>
  <FileIcon extension={getFileExtension(node.name)} />
  <span>{node.name}</span>
</div>`

export const usage_dir_code = `<script lang="ts">
  let nodes: FileTreeNode[] = $state([
    {
      type: 'directory',
      name: 'routes',
      isExpanded: false,
      children: [file_node]
    }
  ])
  let dir_node: DirectoryNode =
    $derived(nodes[0] as DirectoryNode)
<\/script>

<DirectoryNodeComponent
  bind:nodes
  node={dir_node}
  depth={0}
  path={'routes'}
/>`

export const def_dir_code = `<!-- DirectoryNode.svelte -->
<script lang="ts">
  const { nodes = $bindable, node, depth, path } = $props()

  function handleToggle() {
    updateNodeByPath(nodes, path, (n) => {
      n.isExpanded = !n.isExpanded
    })
  }
<\/script>

<div onclick={handleToggle} >
  {#if node.isExpanded}
    <Icon icon="mdi:chevron-down"></Icon>
  {:else}
    <Icon icon="mdi:chevron-right"></Icon>
  {/if}

  {#if node.isExpanded}
    <Icon icon="mdi:folder-open-outline"></Icon>
  {:else}
    <Icon icon="mdi:folder-outline"></Icon>
  {/if}

  <span>{node.name}</span>
  <span>{node.children.length} items</span>
</div>`
