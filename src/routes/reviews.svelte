<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/graphql/reviews.json');
		if (res.ok) {
			const data = await res.json();

			return {
				props: {
					reviews: data.reviews
				}
			};
		}

		return {
			error: String(res.status)
		};
	};
</script>

<script>
	export let reviews;
</script>

<div class="columns is-multiline">
	{#each reviews as review}
		<div class="column is-3">
			<div class="card">
				<header class="card-header">
					<p class="card-header-title">{review.book.title}</p>
				</header>
				<div class="card-content">
					<div class="content">
						{review.text}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
