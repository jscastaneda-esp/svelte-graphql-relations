<script>
	export let type = 'buttom';
	export let className = '';
	export let isInfo = false;
	export let disabled = false;
	export let value = '';
</script>

<button {type} class={`btn ${className}`} class:info={isInfo} {disabled} on:click>
	<slot name="icon" />
	<span>{value}</span>
</button>
