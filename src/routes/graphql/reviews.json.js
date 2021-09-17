import { query } from './_api';
import { reviews } from './_querys';

export const get = async () => query(reviews, {});
