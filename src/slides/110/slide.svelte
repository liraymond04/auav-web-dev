<script lang="ts">
	import DirectoryNodeComponent from '$lib/components/filetree/DirectoryNode.svelte'
	import FileNodeComponent from '$lib/components/filetree/FileNode.svelte'
	import type { DirectoryNode, FileNode, FileTreeNode } from '$lib/components/filetree/types'
	import { Action, Code, Transition } from '@animotion/core'

	let text: HTMLParagraphElement

	let file_node: FileNode = {
		type: 'file',
		name: '+page.svelte',
		extension: 'svelte'
	}

	let nodes: FileTreeNode[] = $state([
		{
			type: 'directory',
			name: 'routes',
			isExpanded: false,
			children: [file_node]
		}
	])
	let dir_node: DirectoryNode = $derived(nodes[0] as DirectoryNode)

	let file_code: ReturnType<typeof Code>
	let dir_code: ReturnType<typeof Code>

	let showPrev = $state(true)

	const usage_file_code = `
		<script lang="ts">
			let file_node: FileNode = {
				type: 'file',
				name: '+page.svelte',
				extension: 'svelte'
			}
		<\/script>

		<FileNodeComponent
			node={file_node}
			depth={0}
			path={'routes/+page.svelte'}
		/>
	`

	const def_file_code = `
		<!-- FileNode.svelte -->
		<script lang="ts">
			const { node, depth, path } = $props()

			function handleClick() {
				console.log(path)
			}
		<\/script>

		<div
			onclick={handleClick}
		>
			<FileIcon extension={node.extension} />
			<span>{node.name}</span>
		</div>
	`

	const usage_dir_code = `
		<script lang="ts">
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
		/>
	`

	const def_dir_code = `
		<!-- DirectoryNode.svelte -->
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
		</div>
	` 
</script>

<div class="relative flex min-h-screen flex-col">
	<div class="flex flex-grow flex-col items-center justify-center">
		<Transition visible>
			<p bind:this={text} class="p-8 text-center text-5xl font-bold">Separation of Concerns</p>
		</Transition>
		<div class="flex gap-x-8">
			{#if showPrev}
				<Transition>
					<iframe title="slide_content" class="min-h-80 min-w-120" src="/embed/filetree"></iframe>
				</Transition>
			{/if}
			<Transition do={() => (showPrev = false)} undo={() => (showPrev = true)}>
				<div class="pt-2 pb-2">
					<FileNodeComponent node={file_node} depth={0} path={'routes/+page.svelte'} />
				</div>
				<div>
					<Code
						bind:this={file_code}
						lang="svelte"
						theme="poimandres"
						class="w-[360px]"
						code={usage_file_code}
						options={{
							duration: 800,
							stagger: 0.3,
							lineNumbers: true,
							containerStyle: false,
							enhanceMatching: true
						}}
					/>
					<Action
						do={() => file_code.update`${def_file_code}`}
						undo={() => file_code.update`${usage_file_code}`}
					/>
				</div>
			</Transition>
			<Transition>
				<div class="pt-2 pb-2">
					<DirectoryNodeComponent bind:nodes node={dir_node} depth={0} path={'routes'} />
				</div>
				<div>
					<Code
						bind:this={dir_code}
						lang="svelte"
						theme="poimandres"
						class="w-[380px]"
						code={usage_dir_code}
						options={{
							duration: 800,
							stagger: 0.3,
							lineNumbers: true,
							containerStyle: false,
							enhanceMatching: true
						}}
					/>
					<Action
						do={() =>
							dir_code.update`${def_dir_code}`}
							undo={() => dir_code.update`${usage_dir_code}`}
					/>
				</div>
			</Transition>
		</div>
	</div>
</div>

<style>
	:global(pre.shiki) {
		font-size: 10px !important;
	}

	:global(.shiki-magic-move-container) {
		font-size: 10px !important;
	}
</style>
