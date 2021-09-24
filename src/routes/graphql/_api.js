import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { enviroment } from '$lib/utils/enviroment';

const uri = enviroment.graphQLURI || 'http://localhost:3001';

const client = new ApolloClient({
	uri,
	cache: new InMemoryCache()
});
console.log(`Connect GraphQL URI ${uri}`);

export async function gqQuery(query, variables) {
	console.log(query, variables);

	try {
		const result = await client.query({
			query,
			variables,
			fetchPolicy: 'network-only'
		});

		return {
			status: 200,
			body: result.data
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			error: 'Error retrieving data'
		};
	}
}

export async function gqMutate(mutation, variables) {
	console.log(mutation, variables);

	try {
		const result = await client.mutate({
			mutation,
			variables,
			fetchPolicy: 'network-only'
		});

		return {
			status: 200,
			body: result.data
		};
	} catch (error) {
		console.log(error);

		if (error.networkError && error.networkError.statusCode === 400) {
			return {
				status: error.networkError.statusCode,
				body: error.networkError.result.errors
			};
		} else {
			return {
				status: 500,
				error: 'Error sending data'
			};
		}
	}
}
