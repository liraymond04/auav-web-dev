<script lang="ts">
	import Icon from "@iconify/svelte"

	// export let extension: string | undefined = undefined;
	const { extension } = $props()

	function getFileColor(ext?: string): string {
		switch (ext) {
			case 'svelte':
				return 'text-orange-500'
			case 'tsx':
			case 'jsx':
				return 'text-blue-500'
			case 'ts':
			case 'js':
				return 'text-yellow-500'
			case 'json':
				return 'text-green-500'
			case 'md':
				return 'text-purple-500'
			case 'html':
				return 'text-red-500'
			default:
				return 'text-gray-500'
		}
	}

	const fileColor = $derived(getFileColor(extension))
</script>

<Icon icon="mdi:file-document-outline" class="ml-1 h-4 w-4 {fileColor}"></Icon>
