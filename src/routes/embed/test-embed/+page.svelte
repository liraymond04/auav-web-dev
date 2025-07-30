<script lang="ts">
	const { data } = $props()

	let count = $state(0)
</script>

<div>Test embedded content {data.test_data}</div>

Count: {count}

<button onclick={() => count++}>Increment</button>
