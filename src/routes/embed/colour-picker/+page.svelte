<script lang="ts">
	let r = $state(128)
	let g = $state(128)
	let b = $state(128)

	const rgbColor = $derived(`rgb(${r}, ${g}, ${b})`)
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
