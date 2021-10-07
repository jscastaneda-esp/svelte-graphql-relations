<script>
	import '@fortawesome/fontawesome-free/css/all.css';
	import '../app.postcss';

	import { page } from '$app/stores';
	import graphqlLogo from '$lib/assets/graphql-logo.png';
	import svelteLogo from '$lib/assets/svelte-logo.png';

	let menuClosed = true;
</script>

<nav class="bg-gray-800">
	<div class="navbar">
		<div>
			<!-- Mobile menu button-->
			<div class="toggle-mobile-menu">
				<button type="button" aria-expanded="false" on:click={() => (menuClosed = !menuClosed)}>
					<span class="sr-only">Open main menu</span>
					<i class="icon-xl fas" class:fa-bars={menuClosed} class:fa-times={!menuClosed} />
				</button>
			</div>
			<!-- Desktop menu -->
			<div class="desktop-menu">
				<div class="brand">
					<img class="h-8 w-auto" src={graphqlLogo} alt="GraphQL" />
					<img class="h-8 w-auto" src={svelteLogo} alt="Svelte" />
				</div>
				<div class="menu">
					<div>
						<a href="/" class="navbar-item" class:active={$page.path === '/'}>Ping</a>
						<a href="/authors" class="navbar-item" class:active={$page.path === '/authors'}
							>Authors</a
						>
						<a href="/books" class="navbar-item" class:active={$page.path === '/books'}>Books</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="mobile-menu" class:hidden={menuClosed}>
		<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
		<a href="/" class="navbar-item" class:active={$page.path === '/'}>Ping</a>
		<a href="/authors" class="navbar-item" class:active={$page.path === '/authors'}>Authors</a>
		<a href="/books" class="navbar-item" class:active={$page.path === '/books'}>Books</a>
	</div>
</nav>

<div class="content">
	<slot />
</div>

<style lang="postcss">
	.navbar {
		@apply max-w-7xl mx-auto px-2 sm:px-6 lg:px-8;
	}

	.navbar > div {
		@apply relative flex items-center justify-between h-16;
	}

	.toggle-mobile-menu {
		@apply absolute inset-y-0 left-0 flex items-center sm:hidden;
	}

	.toggle-mobile-menu button {
		@apply p-2 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none;
	}

	.desktop-menu {
		@apply flex-1 flex items-center justify-center sm:items-stretch sm:justify-start;
	}

	.desktop-menu .brand {
		@apply flex-shrink-0 flex items-center;
	}

	.desktop-menu .menu {
		@apply hidden flex-1 sm:flex sm:ml-6 sm:justify-between;
	}

	.desktop-menu .menu > div {
		@apply flex space-x-4;
	}

	.mobile-menu {
		@apply px-2 pt-2 pb-3 space-y-1 sm:hidden;
	}

	.navbar-item {
		@apply block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white;
	}

	.navbar-item.active {
		@apply bg-gray-900 text-white;
	}

	.content {
		@apply container mx-auto mt-4 px-2 sm:px-0;
	}
</style>
