<script lang="ts">
	import DirectoryNodeComponent from '$lib/components/filetree/DirectoryNode.svelte'
	import FileNodeComponent from '$lib/components/filetree/FileNode.svelte'
	import { usage_dir_code, usage_file_code } from '$lib/components/filetree/shared'
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
</script>

<div class="relative flex min-h-screen flex-col">
	<div class="flex flex-grow flex-col items-center justify-center">
		<Transition visible>
			<p bind:this={text} class="p-8 text-center text-5xl font-bold">Reusability via components</p>
		</Transition>
		<div class="flex gap-x-8">
			<Transition>
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
				</div>
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
				</div>
			</Transition>

			<Transition hidden>
				<Action
					undo={() => {
						file_code.selectLines`*`
						dir_code.selectLines`*`
					}}
					actions={[
						() => {
							file_code.selectLines`5-7,11`
							dir_code.selectLines``
						},
						() => dir_code.selectLines`5-9, 12`
					]}
				/>
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
