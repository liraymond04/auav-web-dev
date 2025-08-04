<script lang="ts">
	import DirectoryNodeComponent from '$lib/components/filetree/DirectoryNode.svelte'
	import FileNodeComponent from '$lib/components/filetree/FileNode.svelte'
	import { usage_dir_code, usage_file_code } from '$lib/components/filetree/shared'
	import type { DirectoryNode, FileNode, FileTreeNode } from '$lib/components/filetree/types'
	import Modal from '$lib/components/Modal.svelte'
	import { Action, Code, Transition } from '@animotion/core'

	let text: HTMLParagraphElement

	let file_node: FileNode = $state({
		type: 'file',
		name: '+page.svelte'
	})

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

	let showFileChange = $state(false)
	let filename = $state('')

	function resetFileChange() {
		filename = ''
		showFileChange = false
	}

	function click(path: string) {
		console.log(path)
		showFileChange = true
	}
</script>

<Modal
	isOpen={showFileChange}
	title="Change file name"
	onprimary={() => {
		file_node.name = filename
		resetFileChange()
	}}
	onsecondary={resetFileChange}
>
	<input class="input" bind:value={filename} placeholder={file_node.name} />
</Modal>

<div class="relative flex min-h-screen flex-col">
	<div class="flex flex-grow flex-col items-center justify-center">
		<Transition visible>
			<p bind:this={text} class="p-8 text-center text-5xl font-bold">Reusability via components</p>
		</Transition>
		<Transition>
			<div class="flex gap-x-8">
				<div>
					<div class="pt-2 pb-2">
						<FileNodeComponent node={file_node} depth={0} path={'routes/+page.svelte'} {click} />
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
				</div>
				<div>
					<div class="pt-2 pb-2">
						<DirectoryNodeComponent bind:nodes node={dir_node} depth={0} path={'routes'} {click} />
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
				</div>
			</div>
		</Transition>

		<Transition hidden>
			<Action
				undo={() => {
					file_node.name = '+page.svelte'
					file_code.update`${usage_file_code}`
					file_code.selectLines`*`
					dir_code.selectLines`*`
				}}
				actions={[
					() => {
						file_code.selectLines`2-5`
						dir_code.selectLines`7`
					},
					() => {
						file_code.update`${usage_file_code.replaceAll('+page.svelte', '+page.server.ts')}`
						file_node.name = '+page.server.ts'
					}
				]}
			/>
		</Transition>
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
