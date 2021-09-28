import { gqQuery, gqMutate } from './_api';
import { books, deleteBook } from './_querys';

export const get = async () => gqQuery(books, {});

export const del = async ({ query }) =>
	gqMutate(deleteBook, {
		id: query.get('id')
	});
