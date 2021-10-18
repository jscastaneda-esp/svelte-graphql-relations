<script context="module">
	export const load = async ({ page, fetch }) => {
		const resBooks = await loadBooks(fetch);
		if (resBooks.books) {
			const resAuthors = await loadAuthors(fetch);
			if (resAuthors.authors) {
				return {
					props: {
						books: resBooks.books,
						authors: resAuthors.authors,
						newBook: page.query.get('new')
					}
				};
			}

			return resAuthors;
		}

		return resBooks;
	};

	const loadBooks = async (fetch) => {
		const res = await fetch('/graphql/books.json');
		if (res.ok) {
			const data = await res.json();
			return {
				books: data.books
			};
		} else if (res.status === 400) {
			const errors = await res.json();

			return {
				error: errors.join('\n')
			};
		}

		return {
			error: String(res.status)
		};
	};

	const loadAuthors = async (fetch) => {
		const res = await fetch('/graphql/authors.json');
		if (res.ok) {
			const data = await res.json();
			return {
				authors: data.authors
			};
		} else if (res.status === 400) {
			const errors = await res.json();

			return {
				error: errors.join('\n')
			};
		}

		return {
			error: String(resAuthors.status)
		};
	};
</script>

<script>
	import { afterUpdate } from 'svelte';
	import { form } from 'svelte-forms';

	import ButtonDelete from '$lib/components/ButtonDelete.svelte';
	import ButtonEdit from '$lib/components/ButtonEdit.svelte';
	import ButtonLoading from '$lib/components/ButtonLoading.svelte';
	import ButtonAdd from '$lib/components/ButtonAdd.svelte';
	import CardList from '$lib/components/CardList.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let books = [];
	export let authors = [];
	export let newBook;

	let showModal = newBook ? true : false;
	let loading = false;
	let id;
	let authorId = newBook;
	let title;

	const formData = form(
		() => ({
			authorId: {
				value: authorId,
				validators: ['required']
			},
			title: {
				value: title,
				validators: ['required']
			}
		}),
		{
			validateOnChange: false
		}
	);

	afterUpdate(() => {
		formData.validate();
	});

	const handleOpenModal = () => {
		showModal = true;
	};

	const handleCloseModal = () => {
		showModal = false;
		id = undefined;
		authorId = undefined;
		title = undefined;
		formData.reset();
	};

	const handleSave = async () => {};

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

<CardList items={books} emptyDataMessage="No hay libros" let:item>
	<strong>Author:</strong>
	{item.author.name}
	<svelte:fragment slot="buttons">
		{#if !item.loading}
			<ButtonEdit className="mr-2" on:click={() => console.log('Editando')} />
			<ButtonDelete
				on:click={async () => {
					item.loading = true;
					await handleDelete(item.id);
					item.loading = false;
				}}
			/>
		{:else}
			<ButtonLoading />
		{/if}
	</svelte:fragment>
</CardList>

{#if showModal}
	<Modal
		on:close={handleCloseModal}
		on:submit={handleSave}
		saveDisable={!$formData?.valid}
		{loading}
	>
		<div>
			<label for="author" class="hidden">Author</label>
			<div
				class="group-field"
				class:invalid={$formData?.fields.authorId.dirty && !$formData?.fields.authorId.valid}
			>
			{authorId}
				<select id="title" class="field" type="text" placeholder="Titulo" bind:value={authorId}>
					<option value="">Seleccione un author</option>
					{#each authors as author}
						<option value={author.id}>{author.name}</option>
					{/each}
				</select>
				<span class="icon left-0">
					<i class="fas fa-user" />
				</span>
				Dirty: {$formData?.fields.authorId.dirty}
				Valid: {$formData?.fields.authorId.valid}
				{#if $formData?.fields.authorId.dirty && !$formData?.fields.authorId.valid}
					<span class="icon right-0">
						<i class="fas fa-exclamation-triangle" />
					</span>
				{/if}
			</div>
			{#if $formData?.fields.authorId.dirty && !$formData?.fields.authorId.valid}
				<p class="alert-error">Nombre es requerido</p>
			{/if}
		</div>
		<div>
			<label for="title" class="hidden">Titulo</label>
			<div
				class="group-field"
				class:invalid={$formData?.fields.title.dirty && !$formData?.fields.title.valid}
			>
				<input id="title" class="field" type="text" placeholder="Titulo" bind:value={title} />
				<span class="icon left-0">
					<i class="fas fa-book" />
				</span>
				{#if $formData?.fields.title.dirty && !$formData?.fields.title.valid}
					<span class="icon right-0">
						<i class="fas fa-exclamation-triangle" />
					</span>
				{/if}
			</div>
			{#if $formData?.fields.title.dirty && !$formData?.fields.title.valid}
				<p class="alert-error">Nombre es requerido</p>
			{/if}
		</div>
	</Modal>
{/if}
