export const counter_code = `<script lang="ts">
	let count = $state(0)
</script>

<div>
  Current count is: {count}
	<button onclick={() => (count += 1)}>Count</button>
</div>`
