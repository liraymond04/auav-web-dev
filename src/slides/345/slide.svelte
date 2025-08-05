
<script lang="ts">
	import { cart_code, item_code, list_code, page_code } from '$lib/components/shopping/shared'
	import { Code, Transition } from '@animotion/core'

	let page: ReturnType<typeof Code>
	let cart: ReturnType<typeof Code>
	let item: ReturnType<typeof Code>
	let list: ReturnType<typeof Code>
</script>

<!-- Page -->
<div class="relative flex min-h-screen">
<div>

</div>
	<Code
		bind:this={page}
		lang="svelte"
		theme="poimandres"
		class="w-[480px]"
		code={page_code}
		options={{
			duration: 800,
			stagger: 0.3,
			lineNumbers: true,
			containerStyle: false,
			enhanceMatching: true
		}}
	/>
</div>
