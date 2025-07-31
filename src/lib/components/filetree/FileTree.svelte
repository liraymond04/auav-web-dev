<script lang="ts">
	import type { FileTreeNode } from './types'
	import FileTreeNodeComponent from './FileTreeNode.svelte'

	let { nodes = $bindable() }: { nodes: FileTreeNode[] } = $props()
</script>

<div class="rounded-lg border border-gray-300">
	<div class="border-b border-gray-300 px-4 py-2">
		<h3 class="text-lg font-semibold">Project Files</h3>
	</div>
	<div class="overflow-y-auto">
		{#each nodes as node}
			<FileTreeNodeComponent bind:nodes {node} depth={0} path={node.name} />
		{/each}
	</div>
</div>
