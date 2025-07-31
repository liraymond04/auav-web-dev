<script lang="ts">
	import FileTree from '$lib/components/filetree/FileTree.svelte'
	import { sampleFileTree } from '$lib/components/filetree/sampleData'
	import type { FileTreeNode } from '$lib/components/filetree/types'

	let nodes: FileTreeNode[] = $state(structuredClone(sampleFileTree))
</script>

<FileTree bind:nodes />
