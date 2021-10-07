<script>
	import Button from '$lib/components/Button.svelte';

	export let value = '';
</script>

<Button {value} isInfo on:click>
	<i class="icon-xl fas fa-plus-square" slot="icon" />
</Button>
