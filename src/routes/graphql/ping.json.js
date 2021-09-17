import { query } from './_api';
import { ping } from './_querys';

export const get = async () => query(ping, {});
