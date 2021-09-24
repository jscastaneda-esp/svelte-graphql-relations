import { gqQuery, gqMutate } from './_api';
import { authors, createAuthor, updateAuthor, deleteAuthor } from './_querys';

export const get = async () => gqQuery(authors, {});

export const post = async ({ body }) =>
	gqMutate(createAuthor, {
		input: body
	});

export const put = async ({ query, body }) => {
	console.log(query, body)
	return gqMutate(updateAuthor, {
		id: query.get('id'),
		input: body
	});
}

export const del = async ({ query }) =>
	gqMutate(deleteAuthor, {
		id: query.get('id')
	});
