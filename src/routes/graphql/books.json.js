import { query } from './_api';
import { books } from './_querys';

export const get = async () => query(books, {});
