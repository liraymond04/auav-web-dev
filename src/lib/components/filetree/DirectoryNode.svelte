<script lang="ts">
	import type { DirectoryNode, FileTreeNode } from './types'
	import FileTreeNodeComponent from './FileTreeNode.svelte'
	import Icon from '@iconify/svelte'

	let {
		nodes = $bindable(),
		node,
		depth,
		path
	}: {
		nodes: FileTreeNode[]
		node: DirectoryNode
		depth: number
		path: string
	} = $props()

	const paddingLeft = $derived(`${depth * 20 + 8}px`)

	function updateNodeByPath(
		nodes: FileTreeNode[],
		targetPath: string,
		updateFn: (node: DirectoryNode) => void,
		currentPath: string = ''
	): boolean {
		for (const n of nodes) {
			const nodePath = currentPath ? `${currentPath}/${n.name}` : n.name

			if (n.type === 'directory') {
				if (nodePath === targetPath) {
					updateFn(n)
					return true
				}
				if (updateNodeByPath(n.children, targetPath, updateFn, nodePath)) {
					return true
				}
			}
		}
		return false
	}

	function handleToggle() {
		updateNodeByPath(nodes, path, (n) => {
			n.isExpanded = !n.isExpanded
		})
	}
</script>

<div>
	<div
		class="hover:bg-base-200 flex cursor-pointer items-center px-2 py-1"
		style="padding-left: {paddingLeft}"
		onclick={handleToggle}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && handleToggle()}
	>
		{#if node.isExpanded}
			<Icon icon="mdi:chevron-down" class="h-4 w-4 text-gray-400"></Icon>
		{:else}
			<Icon icon="mdi:chevron-right" class="h-4 w-4 text-gray-400"></Icon>
		{/if}

		{#if node.isExpanded}
			<Icon icon="mdi:folder-open-outline" class="ml-1 h-4 w-4 text-blue-600"></Icon>
		{:else}
			<Icon icon="mdi:folder-outline" class="ml-1 h-4 w-4 text-blue-600"></Icon>
		{/if}

		<span class="ml-2 text-sm font-medium">{node.name}</span>
		<span class="ml-auto text-xs text-gray-500">
			{node.children.length} items
		</span>
	</div>

	{#if node.isExpanded}
		<div>
			{#each node.children as child}
				<FileTreeNodeComponent
					bind:nodes
					node={child}
					depth={depth + 1}
					path="{path}/{child.name}"
				/>
			{/each}
		</div>
	{/if}
</div>
