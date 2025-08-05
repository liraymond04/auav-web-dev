<script lang="ts">
	import { parseRGBString } from '$lib/components/colour-picker/utils'
	import { tween } from '@animotion/motion'
	import { onMount } from 'svelte'

	let r = $state(128)
	let g = $state(128)
	let b = $state(128)

	let rgbColor = $derived(`rgb(${r}, ${g}, ${b})`)

	let target = $state<{ r: number; g: number; b: number }>()
	// svelte-ignore state_referenced_locally
	let new_col = tween({ r: r, g: g, b: b })
	let changing_col = $state(false)

	$effect(() => {
		if (changing_col && target) {
			r = Number(new_col.r.toFixed(0))
			g = Number(new_col.g.toFixed(0))
			b = Number(new_col.b.toFixed(0))
			if (r === target.r && g === target.g && b === target.b) {
				target = undefined
				changing_col = false
			}
		}
	})

	onMount(() => {
		window.addEventListener('message', (event) => {
			if (event.origin !== window.origin) return

			const { type, payload } = event.data

			if (type === 'updateColour') {
				console.log('Colour received from parent:', payload.colour)
				const parsed_rgb = parseRGBString(payload.colour)
				if (parsed_rgb) {
					new_col.to(parsed_rgb)
					target = parsed_rgb
				}
				changing_col = true
			}
		})
	})
</script>

<div class="mx-auto max-w-md p-6 font-sans">
	<h2 class="mb-4 text-2xl font-semibold">RGB Color Picker</h2>

	<div class="space-y-4">
		<!-- R -->
		<div class="flex items-center space-x-2">
			<label for="r" class="w-5 font-bold uppercase">R</label>
			<input id="r" type="range" min="0" max="255" bind:value={r} class="flex-1 accent-red-500" />
			<input type="number" min="0" max="255" bind:value={r} class="w-16 rounded border px-2 py-1" />
		</div>

		<!-- G -->
		<div class="flex items-center space-x-2">
			<label for="g" class="w-5 font-bold uppercase">G</label>
			<input id="g" type="range" min="0" max="255" bind:value={g} class="flex-1 accent-green-500" />
			<input type="number" min="0" max="255" bind:value={g} class="w-16 rounded border px-2 py-1" />
		</div>

		<!-- B -->
		<div class="flex items-center space-x-2">
			<label for="b" class="w-5 font-bold uppercase">B</label>
			<input id="b" type="range" min="0" max="255" bind:value={b} class="flex-1 accent-blue-500" />
			<input type="number" min="0" max="255" bind:value={b} class="w-16 rounded border px-2 py-1" />
		</div>
	</div>

	<!-- Color Display Box -->
	<div class="mt-6 h-36 w-full rounded border shadow" style="background-color: {rgbColor}"></div>

	<!-- Color Code -->
	<p class="mt-4 text-gray-700">
		Current Color: <code class="font-mono text-sm">{rgbColor}</code>
	</p>
</div>
