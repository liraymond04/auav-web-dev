<script lang="ts">
	import type { CartItem, Product } from './types'
	import { getProduct } from './utils'

	let {
		products,
		cart = $bindable(),
		remove
	}: { products: Product[]; cart: CartItem[]; remove: (product: CartItem) => void } = $props()
</script>

<h2 class="mb-2 text-2xl font-bold">Your Cart</h2>

{#if cart.length === 0}
	<p>Cart is empty</p>
{:else}
	<ul>
		{#each cart as item}
			<li class="card card-border mb-1 p-2">
				<div class="flex items-center justify-between">
					<span>{getProduct(products, item.id)?.name} x {item.quantity}</span>
					<button class="btn btn-soft btn-error" onclick={() => remove(item)}>Remove</button>
				</div>
			</li>
		{/each}
	</ul>

	<p class="mt-4 font-bold">
		Total: ${cart.reduce(
			(total, item) => total + (getProduct(products, item.id)?.price ?? 0) * item.quantity,
			0
		)}
	</p>
{/if}
