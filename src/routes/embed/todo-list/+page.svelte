<script lang="ts">
	import { invalidateAll } from '$app/navigation'

	let title = $state('')
	let comments = $state('')
	const { data } = $props()

	let todos = $derived(data.todos)

	async function addTodo() {
		if (!title) return

		await fetch('/api/todo-list/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, comments })
		})

		title = ''
		comments = ''
		await invalidateAll()
	}

	async function deleteTodo(id: number) {
		await fetch(`/api/todo-list/remove`, {
			method: 'post',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ id })
		})
		await invalidateAll()
	}

	async function toggleComplete(id: number, completed: boolean) {
		await fetch(`/api/todo-list/update`, {
			method: 'post',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ id, completed: !completed })
		})
		await invalidateAll()
	}

	async function updateComment(id: number, comments: string) {
		await fetch(`/api/todo-list/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, comments })
		})
		await invalidateAll()
	}
</script>

<div class="mx-auto max-w-xl p-4 font-sans">
	<h1 class="mb-4 text-2xl font-bold">Todo List</h1>

	<form
		class="mb-6 flex flex-col gap-2"
		onsubmit={(e) => {
			e.preventDefault()
			addTodo()
		}}
	>
		<input type="text" placeholder="Title" bind:value={title} class="rounded border p-2" />
		<input
			type="text"
			placeholder="Comment (optional)"
			bind:value={comments}
			class="rounded border p-2"
		/>
		<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add Todo
		</button>
	</form>

	<ul class="space-y-4">
		{#each todos as todo}
			<li class="flex flex-col rounded p-4 mb-4 shadow-xl">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<input
							type="checkbox"
							checked={todo.completed}
							onchange={() => toggleComplete(todo.id, todo.completed)}
							class="h-5 w-5"
						/>
						<span class={todo.completed ? 'text-gray-500 line-through' : ''}>
							{todo.title}
						</span>
					</div>
					<button class="text-red-500 hover:text-red-700" onclick={() => deleteTodo(todo.id)}>
						✕
					</button>
				</div>
				<textarea
					class="mt-2 w-full rounded border p-2 text-sm"
					bind:value={todo.comments}
					onblur={() => updateComment(todo.id, todo.comments)}
					placeholder="Add a comment..."
				></textarea>
			</li>
		{/each}
	</ul>
</div>
