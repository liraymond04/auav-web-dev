<script>
	import { Transition } from '@animotion/core'
</script>

<div class="flex h-full min-h-screen flex-col place-content-center place-items-center">
	<Transition visible>
		<p class="text-5xl font-bold">Components</p>
	</Transition>
	<Transition>
		<ul class="mt-6 space-y-2 text-left text-2xl">
			<li>Separation of concerns</li>
			<li>Reusability via components</li>
			<li>Props & modular design</li>
			<li>🛠 Project: File tree viewer</li>
		</ul>
	</Transition>
</div>
