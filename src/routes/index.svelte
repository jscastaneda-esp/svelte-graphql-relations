<script>
	import { onDestroy, onMount } from 'svelte';

	let ping;

	const pingTest = async () => {
		const res = await fetch('/graphql/ping.json');
		if (res.ok) {
			const data = await res.json();

			ping = data.ping;
		} else {
			ping = 'error';
		}
	};

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const interval = setInterval(async () => {
		console.log();
		if (ping === 'error') {
			await sleep(5000);
		}

		pingTest();
	}, 5000);

	onMount(pingTest);

	onDestroy(() => clearInterval(interval));
</script>

<div
	class="mx-auto shadow-2xl p-4 text-center w-64 uppercase text-white font-bold text-lg rounded-lg"
	class:bg-green-500={ping === 'pong'}
	class:bg-red-500={ping !== 'pong'}
>
	{ping === 'pong' ? 'Conectado' : 'Desconectado'}
</div>
