<script>
	import { onMount, createEventDispatcher } from 'svelte';

	export let show = false;
	export let saveDisable = false;
	export let loading = false;

	const dispatch = createEventDispatcher();
	let rootEl;

	onMount(() => {
		rootEl = document.documentElement;
	});

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

	$: if (rootEl) {
		if (show) {
			rootEl.classList.add('is-clipped');
		} else {
			rootEl.classList.remove('is-clipped');
		}
	}
</script>

<div class="modal" class:is-active={show}>
	<div class="modal-background" on:click={handleClose} />
	<div class="modal-content box">
		<form on:submit|preventDefault={handleSubmit}>
			<slot />
			<div class="field has-addons is-justify-content-end">
				{#if !loading}
					<p class="control">
						<button class="button is-light" type="button" on:click|preventDefault={handleClose}>
							<span class="icon">
								<i class="fas fa-ban" />
							</span>
							<span>Cancelar</span>
						</button>
					</p>
				{/if}
				<p class="control">
					<button class="button is-info" class:is-loading={loading} disabled={saveDisable}>
						<span class="icon">
							<i class="fas fa-save" />
						</span>
						<span>Guardar</span>
					</button>
				</p>
			</div>
		</form>
	</div>
	<button class="modal-close is-large" aria-label="close" on:click|preventDefault={handleClose} />
</div>

<style>
</style>
