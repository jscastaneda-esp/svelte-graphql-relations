import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const client = new ApolloClient({
	uri: 'http://localhost:3001',
	cache: new InMemoryCache()
});

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
