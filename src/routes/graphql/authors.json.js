import { query } from './_api';
import { authors } from './_querys';

export const get = async () => query(authors, {});
