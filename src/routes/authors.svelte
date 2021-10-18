<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/graphql/authors.json');
		if (res.ok) {
			const data = await res.json();
			data.authors = data.authors.map((author) => {
				author.title = author.name;
				return author;
			});

			return {
				props: {
					authors: data.authors
				}
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
</script>

<script>
	import { afterUpdate } from 'svelte';
	import { form } from 'svelte-forms';

	import CardList from '$lib/components/CardList.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ButtonLoading from '$lib/components/ButtonLoading.svelte';
	import ButtonDelete from '$lib/components/ButtonDelete.svelte';
	import ButtonEdit from '$lib/components/ButtonEdit.svelte';
	import ButtonAdd from '$lib/components/ButtonAdd.svelte';

	export let authors = [];

	let showModal = false;
	let loading = false;
	let id;
	let name;

	const formData = form(
		() => ({
			name: {
				value: name,
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
		name = undefined;
		formData.reset();
	};

	const handleSave = async () => {
		loading = true;

		if (!id) {
			const res = await fetch('/graphql/authors.json', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name
				})
			});

			if (res.ok) {
				const data = await res.json();
				data.createAuthor.title = data.createAuthor.name;

				authors = [...authors, data.createAuthor];
				handleCloseModal();
			} else {
				console.error(res);

				if (res.status === 400) {
					const errors = await res.json();
					console.error(errors);
				}
			}
		} else {
			const res = await fetch(`/graphql/authors.json?id=${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name
				})
			});

			if (res.ok) {
				const data = await res.json();
				data.updateAuthor.title = data.updateAuthor.name;

				authors = authors.map((author) => (author.id === id ? data.updateAuthor : author));
				handleCloseModal();
			} else {
				console.error(res);

				if (res.status === 400) {
					const errors = await res.json();
					console.error(errors);
				}
			}
		}

		loading = false;
	};

	const handleEdit = (editAuthor) => {
		id = editAuthor.id;
		name = editAuthor.name;
		handleOpenModal();
	};

	const handleDelete = async (deleteId) => {
		const res = await fetch(`/graphql/authors.json?id=${deleteId}`, {
			method: 'DELETE'
		});

		if (res.ok) {
			const data = await res.json();

			authors = authors.filter((author) => author.id !== data.deleteAuthor.id);
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
	<ButtonAdd value="Nuevo Autor" on:click={handleOpenModal} />
</div>

<CardList items={authors} emptyDataMessage="No hay autores" let:item>
	<div class="h-24">
		{#if item.books.length}
			<ul class="list-books">
				{#each item.books as book}
					<li>
						{book.title}
					</li>
				{/each}
			</ul>
		{:else}
			<a href={`/books?new=${item.id}`} class="btn info w-1/2 m-auto">Crear nuevo libro</a>
		{/if}
	</div>
	<svelte:fragment slot="buttons">
		{#if !item.loading}
			<ButtonEdit className="mr-2" on:click={() => handleEdit(item)} />
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
			<label for="name" class="hidden">Nombre</label>
			<div
				class="group-field"
				class:invalid={$formData?.fields.name.dirty && !$formData?.fields.name.valid}
			>
				<input id="name" class="field" type="text" placeholder="Nombre" bind:value={name} />
				<span class="icon left-0">
					<i class="fas fa-user" />
				</span>
				{#if $formData?.fields.name.dirty && !$formData?.fields.name.valid}
					<span class="icon right-0">
						<i class="fas fa-exclamation-triangle" />
					</span>
				{/if}
			</div>
			{#if $formData?.fields.name.dirty && !$formData?.fields.name.valid}
				<p class="alert-error">Nombre es requerido</p>
			{/if}
		</div>
	</Modal>
{/if}

<style lang="postcss">
	.list-books {
		@apply list-disc list-inside overflow-x-auto h-full;
	}
</style>
