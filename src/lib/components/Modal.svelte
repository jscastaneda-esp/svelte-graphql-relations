<script>
	import { onMount, createEventDispatcher } from 'svelte';

	import Button from '$lib/components/Button.svelte';
	import ButtonLoading from '$lib/components/ButtonLoading.svelte';

	export let saveDisable = false;
	export let loading = false;
	const dispatch = createEventDispatcher();

	const handleClose = () => {
		if (!loading) {
			dispatch('close');
		}
	};
	const handleSubmit = () => {
		if (!loading) {
			dispatch('submit');
		}
	};
</script>

<div class="modal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="background" aria-hidden="true" on:click={handleClose} />

	<div class="content">
		<div class="close p-px-6" class:hidden={loading} on:click|preventDefault={handleClose}>
			<i class="icon-xl fas fa-times" />
		</div>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="body">
				<slot />
			</div>
			<div class="buttons">
				{#if !loading}
					<Button
						type="submit"
						className="w-full sm:w-auto"
						value="Guardar"
						isInfo
						disabled={saveDisable}
					>
						<i class="icon-xl fas fa-save" slot="icon" />
					</Button>
					<Button
						className="mb-2 w-full sm:mb-0 sm:mr-2 sm:w-auto"
						value="Cancelar"
						on:click={handleClose}
					>
						<i class="icon-xl fas fa-ban" slot="icon" />
					</Button>
				{:else}
					<ButtonLoading className="w-full sm:w-auto" />
				{/if}
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	.modal {
		@apply fixed flex z-10 inset-0 justify-center items-center min-h-screen pt-4 px-4 pb-20 overflow-y-auto sm:p-0;
	}

	.modal .background {
		@apply fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity;
	}

	.modal .content {
		height: max-content;
		@apply w-auto inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full;
	}

	.content .close {
		@apply absolute rounded-full leading-none cursor-pointer bg-red-600 text-center -right-2 -top-2;
	}

	.content .body {
		@apply p-4 sm:p-6;
	}

	.content .buttons {
		@apply px-4 py-3 flex flex-col-reverse sm:flex-row-reverse sm:px-6 sm:justify-start;
	}
</style>
