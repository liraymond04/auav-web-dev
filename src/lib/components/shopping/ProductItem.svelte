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

<div class="card card-border shadow mb-1">
	<div class="flex items-center justify-between p-2">
		<span>{product.name} - ${product.price}</span>
		<button class="btn btn-soft btn-primary" onclick={handleAdd}>Add to Cart</button>
	</div>
</div>
