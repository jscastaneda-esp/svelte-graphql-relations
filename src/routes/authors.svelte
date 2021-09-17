<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/graphql/authors.json');
		if (res.ok) {
			const data = await res.json();

			return {
				props: {
					authors: data.authors
				}
			};
		}

		return {
			error: String(res.status)
		};
	};
</script>

<script>
	export let authors;
</script>

<div class="columns is-multiline">
	{#each authors as author}
		<div class="column is-3">
			<div class="card">
				<header class="card-header">
					<p class="card-header-title">{author.name}</p>
				</header>
				<div class="card-content">
					<div class="content">
						<h4>Libros:</h4>
						<ul>
							{#each author.books as book}
								<li>
									{book.title}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
