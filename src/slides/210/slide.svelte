<script lang="ts">
	import { counter_code } from '$lib/components/counter/shared'
	import { Action, Code, Transition } from '@animotion/core'

	let code: ReturnType<typeof Code>
</script>

<div class="relative flex min-h-screen flex-col">
	<div class="flex flex-grow items-center justify-center">
		<iframe title="slide_content" class="min-h-100 min-w-120" src="/embed/counter"></iframe>
		<Transition>
			<div class="ml-20">
				<Code
					bind:this={code}
					lang="svelte"
					theme="poimandres"
					class="w-[480px]"
					code={counter_code}
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
					code.update`${counter_code}`
				}}
				actions={[
					() => code.selectLines`2`,
					() => code.selectLines`6-7`,
					() => code.selectLines`*`
				]}
			></Action>
		</Transition>
	</div>
</div>
