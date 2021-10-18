<script>
	import { onMount, onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 3000,
		easing: cubicOut
	});

	onMount(() => {
		progress.set(0.9);
	});

	onDestroy(() => {
		progress.set(1);
	});
</script>

<div class="progress-bar">
	<div class="progress-sliver" style={`--width: ${$progress * 100}%`}>{$progress}</div>
</div>

<style lang="postcss">
	.progress-bar {
		@apply fixed h-1 inset-0 bg-black;
	}

	.progress-sliver {
		width: var(--width);
		@apply h-full bg-red-600;
		height: 100%;
	}
</style>
