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
	import Button from '$lib/components/Button.svelte';

	import ButtonDelete from '$lib/components/ButtonDelete.svelte';
	import ButtonEdit from '$lib/components/ButtonEdit.svelte';
	import ButtonLoading from '$lib/components/ButtonLoading.svelte';
	import CardItem from '$lib/components/CardItem.svelte';
	import CardList from '$lib/components/CardList.svelte';

	export let books = [];

	let showModal = false;

	const handleOpenModal = () => {
		showModal = true;
	};

	const handleDelete = async (deleteId) => {
		const res = await fetch(`/graphql/books.json?id=${deleteId}`, {
			method: 'DELETE'
		});

		if (res.ok) {
			const data = await res.json();

			books = books.filter((book) => book.id !== data.deleteBook.id);
		} else {
			console.error(res);

			if (res.status === 400) {
				const errors = await res.json();
				console.error(errors);
			}
		}
	};
</script>

<div class="block mb-2">
	<Button value="Nuevo Libro" isInfo on:click={handleOpenModal}>
		<svg
			slot="icon"
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	</Button>
</div>

{#if !books.length}
	<p class="text-gray-700 p-3 text-lg text-center font-semibold">No hay libros</p>
{:else}
	<CardList>
		{#each books as book}
			<CardItem title={book.title} loading={book.loading}>
				<strong>Author:</strong>
				{book.author.name}
				<svelte:fragment slot="buttons">
					{#if !book.loading}
						<ButtonEdit className="mr-2" on:click={() => console.log('Editando')} />
						<ButtonDelete
							on:click={async () => {
								book.loading = true;
								await handleDelete(book.id);
								book.loading = false;
							}}
						/>
					{:else}
						<ButtonLoading />
					{/if}
				</svelte:fragment>
			</CardItem>
		{/each}
	</CardList>
{/if}
