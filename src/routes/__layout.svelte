<script>
	import { page } from '$app/stores';
	import '../app.css';
</script>

<nav class="navbar is-info" role="navigation" aria-label="main navigation">
	<div class="navbar-menu">
		<div class="navbar-start">
			<a sveltekit:prefetch href="/" class="navbar-item" class:is-active={$page.path === '/'}
				>Ping</a
			>
			<a
				sveltekit:prefetch
				href="/authors"
				class="navbar-item"
				class:is-active={$page.path === '/authors'}>Authors</a
			>
			<a
				sveltekit:prefetch
				href="/books"
				class="navbar-item"
				class:is-active={$page.path === '/books'}>Books</a
			>
		</div>
	</div>
</nav>

<div class="container mt-2">
	<slot />
</div>
