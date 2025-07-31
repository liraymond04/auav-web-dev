<script lang="ts">
	import type { FileTreeNode } from './types'
	import FileNode from './FileNode.svelte'
	import DirectoryNode from './DirectoryNode.svelte'

	let {
		nodes = $bindable(),
		node,
		depth,
		path,
	}: {
		nodes: FileTreeNode[]
		node: FileTreeNode
		depth: number
		path: string
	} = $props()
</script>

{#if node.type === 'file'}
	<FileNode {node} {depth} {path} />
{:else}
	<DirectoryNode bind:nodes {node} {depth} {path} />
{/if}
