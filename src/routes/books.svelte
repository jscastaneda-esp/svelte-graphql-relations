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
	import ButtonDelete from '$lib/components/ButtonDelete.svelte';
	import ButtonEdit from '$lib/components/ButtonEdit.svelte';
	import ButtonLoading from '$lib/components/ButtonLoading.svelte';
	import ButtonAdd from '$lib/components/ButtonAdd.svelte';
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
	<ButtonAdd value="Nuevo Libro" on:click={handleOpenModal} />
</div>

{#if !books.length}
	<p class="empty-data-message">No hay libros</p>
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
