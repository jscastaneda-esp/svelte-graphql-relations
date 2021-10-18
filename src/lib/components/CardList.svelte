<script>
	import CardItem from './CardItem.svelte';

	export let items = [];
	export let emptyDataMessage = 'No se encontró información';
</script>

{#if !items.length}
	<p class="empty-data-message">{emptyDataMessage}</p>
{:else}
	<div class="card-list">
		{#each items as item (item.id)}
			<CardItem title={item.title}>
				<slot {item} />
				<slot name="buttons" slot="buttons" />
			</CardItem>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.card-list {
		@apply grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2;
	}
</style>
