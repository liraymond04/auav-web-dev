<script lang="ts">
	import ProductItem from './ProductItem.svelte'
	import type { Product } from './types'

	let { products, add }: { products: Product[]; add: (product: Product) => void } = $props()
</script>

{#each products as product}
	<ProductItem {product} {add} />
{/each}
