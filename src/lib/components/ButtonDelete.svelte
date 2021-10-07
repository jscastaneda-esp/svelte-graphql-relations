<script>
	export let className = '';
</script>

<button type="button" class={`rounded p-1 text-red-500 ${className} hover:bg-gray-300`} aria-label="Delete" on:click>
	<i class="icon-xl fas fa-trash" />
</button>
