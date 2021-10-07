<div class="card-list">
	<slot />
</div>

<style lang="postcss">
	.card-list {
		@apply grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2;
	}
</style>
