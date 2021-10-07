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
	import CardItem from '$lib/components/CardItem.svelte';
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
		handleOpenModal();
		id = editAuthor.id;
		name = editAuthor.name;
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

<Modal
	show={showModal}
	on:close={handleCloseModal}
	on:submit={handleSave}
	saveDisable={!$formData?.valid}
	{loading}
>
	<div class="field">
		<label for="name" class="label">Nombre</label>
		<p class="control has-icons-left has-icons-right">
			<input
				id="name"
				class="input"
				class:is-danger={$formData?.fields.name.dirty && !$formData?.fields.name.valid}
				type="text"
				placeholder="Nombre"
				bind:value={name}
			/>
			<span
				class="icon is-left"
				class:has-text-danger={$formData?.fields.name.dirty && !$formData?.fields.name.valid}
			>
				<i class="fas fa-user" />
			</span>
			{#if $formData?.fields.name.dirty && !$formData?.fields.name.valid}
				<span class="icon is-right has-text-danger">
					<i class="fas fa-exclamation-triangle" />
				</span>
			{/if}
		</p>
		{#if $formData?.fields.name.dirty && !$formData?.fields.name.valid}
			<p class="help is-danger">Nombre es requerido</p>
		{/if}
	</div>
</Modal>

{#if !authors.length}
	<p class="empty-data-message">No hay autores</p>
{:else}
	<CardList>
		{#each authors as author (author.id)}
			<CardItem title={author.name}>
				<div class="h-24">
					{#if !author.books.length}
						<ul class="list-books">
							{#each author.books as book}
								<li>
									{book.title}
								</li>
							{/each}
						</ul>
					{:else}
						<p class="empty-data-message h-20">Sin libros</p>
					{/if}
				</div>
				<svelte:fragment slot="buttons">
					{#if !author.loading}
						<ButtonEdit className="mr-2" on:click={handleEdit} />
						<ButtonDelete
							on:click={async () => {
								author.loading = true;
								await handleDelete(author.id);
								author.loading = false;
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

<style lang="postcss">
	.list-books {
		@apply list-disc list-inside overflow-x-auto h-full;
	}
</style>