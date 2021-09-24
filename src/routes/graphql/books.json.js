import { gqQuery } from './_api';
import { books } from './_querys';

export const get = async () => gqQuery(books, {});
