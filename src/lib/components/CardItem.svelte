<script>
	export let title = '';
</script>

<div class="card">
	<h2 class="title">{title}</h2>
	<div class="body">
		<slot />
	</div>
	<div class="buttons">
		<slot name="buttons" />
	</div>
</div>

<style lang="postcss">
	.card {
		@apply bg-gray-200 text-gray-700 shadow-lg p-3 rounded;
	}

	.card .title {
		@apply p-2 border-b-2 border-black text-base font-bold;
	}

	.card .body {
		@apply p-2;
	}

	.card .buttons {
		@apply flex justify-end;
	}
</style>
