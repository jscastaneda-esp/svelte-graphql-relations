import { ApolloClient, InMemoryCache } from '@apollo/client/core/core.cjs.js';
import { enviroment } from '$lib/enviroment';

const uri = enviroment.graphQLURI || 'http://localhost:3001';

const client = new ApolloClient({
	uri,
	cache: new InMemoryCache()
});
console.log(`Connect GraphQL URI ${uri}`);

export async function query(query, variables) {
	try {
		const result = await client.query({
			query,
			variables,
			fetchPolicy: 'network-only',
			pollInterval: 0
		});

		return {
			status: 200,
			body: result.data
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			error: 'Error retrieving data'
		};
	}
}
