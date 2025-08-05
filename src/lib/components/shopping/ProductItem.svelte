<script lang="ts">
	import type { Product } from './types'

	let {
		product,
		add
	}: {
		product: Product
		add: (product: Product) => void
	} = $props()

	function handleAdd() {
		add(product)
	}
</script>

<div class="flex items-center justify-between">
	<span>{product.name} - ${product.price}</span>
	<button onclick={handleAdd}>Add to Cart</button>
</div>
