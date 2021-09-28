<script>
	import { page } from '$app/stores';

	import graphqlLogo from '$lib/assets/graphql-logo.png';
	import svelteLogo from '$lib/assets/svelte-logo.png';
	import '../app.postcss';

	let menuClosed = true;
</script>

<nav class="bg-gray-800">
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={() => (menuClosed = !menuClosed)}
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="h-6 w-6"
						class:hidden={!menuClosed}
						class:block={menuClosed}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<svg
						class="h-6 w-6"
						class:block={!menuClosed}
						class:hidden={menuClosed}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0 flex items-center">
					<img class="h-8 w-auto" src={graphqlLogo} alt="GraphQL" />
					<img class="h-8 w-auto" src={svelteLogo} alt="Svelte" />
				</div>
				<div class="hidden sm:block sm:ml-6">
					<div class="flex space-x-4">
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
	<div class="sm:hidden" class:hidden={menuClosed} id="mobile-menu">
		<div class="px-2 pt-2 pb-3 space-y-1">
			<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
			<a href="/" class="navbar-item" class:active={$page.path === '/'}>Ping</a>
			<a href="/authors" class="navbar-item" class:active={$page.path === '/authors'}>Authors</a>
			<a href="/books" class="navbar-item" class:active={$page.path === '/books'}>Books</a>
		</div>
	</div>
</nav>

<div class="container mx-auto mt-4">
	<slot />
</div>

<style lang="postcss">
	.navbar-item {
		@apply text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium;
	}

	.navbar-item.active {
		@apply bg-gray-900 text-white;
	}
</style>
