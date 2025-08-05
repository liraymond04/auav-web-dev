export const page_code = `<!-- Page -->
<script lang="ts">
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

<ProductList {products} add={(e) => addToCart(e)} />
<Cart {products} bind:cart remove={(e) => removeFromCart(e)} />`

export const cart_code = `<!-- Cart -->
<script lang="ts">
	let { products, cart = $bindable(), remove } = $props()
</script>

<h2>Your Cart</h2>

{#if cart.length === 0}
	<p>Cart is empty</p>
{:else}
	<ul>
		{#each cart as item}
			<li>
				<span>{getProduct(products, item.id).name} x {item.quantity}</span>
				<button onclick={() => remove(item)}>Remove</button>
			</li>
		{/each}
	</ul>

	<p>
		Total: \${cart.reduce(
			(total, item) => total + getProduct(products, item.id).price * item.quantity,
			0
		)}
	</p>
{/if}`

export const item_code = `<!-- ProductItem -->
<script lang="ts">
	let { product, add } = $props()

	function handleAdd() {
		add(product)
	}
</script>

<div>
	<span>{product.name} - \${product.price}</span>
	<button onclick={handleAdd}>Add to Cart</button>
</div>`

export const list_code = `<!-- ProductList -->
<script lang="ts">
	let { products, add } = $props()
</script>

{#each products as product}
	<ProductItem {product} {add} />
{/each}`
