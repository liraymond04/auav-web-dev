<!--
  @fileoverview Modal dialog component
  
  Provides a reusable modal dialog with customizable title, message, actions,
  and content. Supports responsive design and automatic centering based on content size.
  
  @author Raymond Li
  @version 1.0.0
-->

<script lang="ts">
	let {
		isOpen = $bindable(),
		title,
		primaryButtonText = 'OK',
		secondaryButtonText = 'Cancel',
		hidePrimaryButton = false,
		primaryButtonColor = '',
		onprimary,
		onsecondary,
		children = undefined,
		isLoading = false
	} = $props()

	function handlePrimary() {
		onprimary()
	}

	function handleSecondary() {
		onsecondary()
	}
</script>

{#if isOpen}
	<div class="modal modal-open">
		<div class="modal-box modal-smart">
			<h3 class="mb-2 text-lg font-bold">{title}</h3>
			{@render children?.()}
			<div class="mt-4">
				<button class="btn" onclick={handleSecondary} disabled={isLoading}>
					{secondaryButtonText}
				</button>
				{#if !hidePrimaryButton}
					<button
						class={`btn ${primaryButtonColor !== '' ? primaryButtonColor : 'btn-primary'}`}
						onclick={handlePrimary}
						disabled={isLoading}
					>
						{primaryButtonText}
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
