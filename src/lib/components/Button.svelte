<script>
	export let className = '';
	export let isInfo = false;
	export let value = '';
</script>

<button class={`btn ${className}`} class:btn-info={isInfo} on:click>
	<slot name="icon" />
	<span>{value}</span>
</button>
