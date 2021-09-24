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
	import Modal from '$lib/components/Modal.svelte';

	export let authors;

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
		loading = true;
		id = deleteId;

		const res = await fetch(`/graphql/authors.json?id=${id}`, {
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

		id = undefined;
		loading = false;
	};
</script>

<div class="block">
	<button class="button is-info" on:click={handleOpenModal}>
		<span class="icon">
			<i class="fas fa-plus-circle" />
		</span>
		<span>Nuevo Author</span>
	</button>
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

<div class="columns is-multiline">
	{#each authors as author (author.id)}
		<div class="column is-3">
			<div class="card">
				<header class="card-header">
					<p class="card-header-title">{author.name}</p>
					{#if id !== author.id}
						<button class="card-header-icon" aria-label="Edit" on:click={() => handleEdit(author)}>
							<span class="icon">
								<i class="fas fa-pen-square" aria-hidden="true" />
							</span>
						</button>
						<button
							class="card-header-icon"
							aria-label="Delete"
							on:click={() => handleDelete(author.id)}
						>
							<span class="icon has-text-danger">
								<i class="fas fa-trash" aria-hidden="true" />
							</span>
						</button>
					{:else}
						<button class="button is-loading" />
					{/if}
				</header>
				<div class="card-content">
					<div class="content">
						{#if author.books.length}
							<h4>Libros:</h4>
							<ul>
								{#each author.books as book}
									<li>
										{book.title}
									</li>
								{/each}
							</ul>
						{:else}
							<h4>Sin libros</h4>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
