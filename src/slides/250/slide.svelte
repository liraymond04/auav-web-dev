<script lang="ts">
	import { component_code } from '$lib/components/colour-picker/shared'
	import { Action, Code, Transition } from '@animotion/core'

	let code: ReturnType<typeof Code>

	let iframeEl: HTMLIFrameElement

	function updateIframeColour(colour: string) {
		iframeEl?.contentWindow?.postMessage(
			{
				type: 'updateColour',
				payload: { colour }
			},
			window.origin
		)
	}
</script>

<div class="relative flex min-h-screen flex-col">
	<div class="flex flex-grow items-center justify-center">
		<iframe
			bind:this={iframeEl}
			title="slide_content"
			class="min-h-100 min-w-120"
			src="/embed/colour-picker"
		></iframe>
		<Transition>
			<div class="ml-20">
				<Code
					bind:this={code}
					lang="svelte"
					theme="poimandres"
					class="w-[480px]"
					code={component_code}
					options={{
						duration: 800,
						stagger: 0.3,
						lineNumbers: true,
						containerStyle: false,
						enhanceMatching: true
					}}
				/>
			</div>
			<Action
				undo={() => {
					code.selectLines`*`
					code.update`${component_code}`
					updateIframeColour('rgb(128, 128, 128)')
				}}
				actions={[
					() => {
						let new_component_code = component_code
						new_component_code = new_component_code.replace(
							'let r = $state(128)',
							`let r = $state(234)`
						)
						new_component_code = new_component_code.replace(
							'let g = $state(128)',
							`let g = $state(29)`
						)
						new_component_code = new_component_code.replace(
							'let b = $state(128)',
							`let b = $state(93)`
						)
						code.update`${new_component_code}`
						updateIframeColour(`rgb(234, 29, 93)`)
					},
					() => code.selectLines`2, 13-18`,
					() => code.selectLines`6, 35-41`
				]}
			></Action>
		</Transition>
	</div>
</div>
