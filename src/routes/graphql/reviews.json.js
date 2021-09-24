import { gqQuery } from './_api';
import { reviewsByBook } from './_querys';

export const get = async ({ query }) => gqQuery(reviewsByBook, { bookId: query.get('book') });
