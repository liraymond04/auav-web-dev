<script lang="ts">
	import type { FileNode } from './types'
	import FileIcon from './FileIcon.svelte'
	import { getFileExtension } from './utils'

	const {
		node,
		depth,
		path,
		click,
	}: { node: FileNode; depth: number; path: string; click?: (path: string) => void } = $props()

	const paddingLeft = $derived(`${depth * 20 + 8}px`)

	function handleClick() {
		click?.(path)
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="hover:bg-base-200 flex cursor-pointer items-center px-2 py-1"
	style="padding-left: {paddingLeft}"
	onclick={handleClick}
>
	<FileIcon extension={getFileExtension(node.name)} />
	<span class="ml-2 text-sm">{node.name}</span>
	{#if node.size}
		<span class="ml-auto text-xs text-gray-500">
			{(node.size / 1024).toFixed(1)}KB
		</span>
	{/if}
</div>
