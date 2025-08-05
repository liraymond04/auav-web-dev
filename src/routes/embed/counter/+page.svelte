<script lang="ts">
	let count = $state(0)
</script>

<div class="font-sans">
  Current count is: {count}
	<button onclick={() => (count += 1)}>Count</button>
</div>
