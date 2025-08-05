<script lang="ts">
	import ProductList from '$lib/components/shopping/ProductList.svelte'
	import Cart from '$lib/components/shopping/Cart.svelte'
	import type { CartItem, Product } from '$lib/components/shopping/types'
	import { getProduct } from '$lib/components/shopping/utils'

	const products: Product[] = [
		{ id: 1, name: 'Apple', price: 1 },
		{ id: 2, name: 'Banana', price: 2 }
	]

	let cart: CartItem[] = $state([])

	function addToCart(product: Product) {
		const existing = cart.find((item) => item.id === product.id)
		if (existing) {
			existing.quantity += 1
		} else {
			cart.push({
				id: product.id,
				quantity: 1
			})
		}
	}

	function removeFromCart(product: CartItem) {
		cart = cart.filter((item) => item.id !== product.id)
	}
</script>

<div class="max-w-2xl p-4 font-sans">
	<ProductList {products} add={(e) => addToCart(e)} />
	<Cart {products} bind:cart remove={(e) => removeFromCart(e)} />

	<p class="mt-4 font-bold">
		Total: ${cart.reduce(
			(total, item) => total + (getProduct(products, item.id)?.price ?? 0) * item.quantity,
			0
		)}
	</p>
</div>
