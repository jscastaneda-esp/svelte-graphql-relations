import { gqQuery } from './_api';
import { ping } from './_querys';

export const get = async () => gqQuery(ping, {});
