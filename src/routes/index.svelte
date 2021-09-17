<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/graphql/ping.json');
		if (res.ok) {
			const data = await res.json();

			return {
				props: { ping: data.ping }
			};
		}

		return {
			error: String(res.status)
		};
	};
</script>

<script>
	export let ping;
</script>

<div class="box">
	{#if ping === 'pong'}
		<h1 class="title is-uppercase has-text-success">Conectado</h1>
	{:else}
		<h1 class="title is-uppercase has-text-danger">Desconectado</h1>
	{/if}
</div>
