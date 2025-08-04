export const component_code = `<script lang="ts">
	let r = $state(128)
	let g = $state(128)
	let b = $state(128)

	const rgbColor = $derived(\`rgb(\${r}, \${g}, \${b})\`)
</script>

<div>
	<h2>RGB Color Picker</h2>

	<div>
		<!-- R -->
		<div>
			<label for="r">R</label>
			<input id="r" type="range" min="0" max="255" bind:value={r} />
			<input type="number" min="0" max="255" bind:value={r} />
		</div>

		<!-- G -->
		<div>
			<label for="g">G</label>
			<input id="g" type="range" min="0" max="255" bind:value={g} />
			<input type="number" min="0" max="255" bind:value={g} />
		</div>

		<!-- B -->
		<div>
			<label for="b">B</label>
			<input id="b" type="range" min="0" max="255" bind:value={b} />
			<input type="number" min="0" max="255" bind:value={b} />
		</div>
	</div>

	<!-- Color Display Box -->
	<div style="background-color: {rgbColor}"></div>

	<!-- Color Code -->
	<p>
		Current Color: <code>{rgbColor}</code>
	</p>
</div>`
