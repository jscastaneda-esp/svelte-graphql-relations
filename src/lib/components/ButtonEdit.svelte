<script>
	export let className = '';
</script>

<button type="button" class={`rounded p-1 ${className} hover:bg-gray-300`} aria-label="Edit" on:click>
	<i class="icon-xl fas fa-edit"></i>
</button>
