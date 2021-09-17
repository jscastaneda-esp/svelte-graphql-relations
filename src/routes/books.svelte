<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/graphql/books.json');
		if (res.ok) {
			const data = await res.json();

			return {
				props: {
					books: data.books
				}
			};
		}

		return {
			error: String(res.status)
		};
	};
</script>

<script>
	export let books;
</script>

<div class="columns is-multiline">
	{#each books as book}
		<div class="column is-3">
			<div class="card">
				<header class="card-header">
					<p class="card-header-title">{book.title}</p>
				</header>
				<div class="card-content">
					<div class="content">
						<strong>Author:</strong>
						{book.author.name}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
