import { gql } from '@apollo/client/core/core.cjs.js';

export const ping = gql`
	query {
		ping
	}
`;

export const books = gql`
	query {
		books {
			id
			title
			author {
				name
			}
		}
	}
`;

export const authors = gql`
	query {
		authors {
			id
			name
			books {
				title
			}
		}
	}
`;

export const createAuthor = gql`
	mutation createAuthor($input: AuthorInput!) {
		createAuthor(input: $input) {
			id
			name
			books {
				title
			}
		}
	}
`;

export const updateAuthor = gql`
	mutation updateAuthor($id: ID!, $input: AuthorInput!) {
		updateAuthor(id: $id, input: $input) {
			id
			name
			books {
				title
			}
		}
	}
`;

export const deleteAuthor = gql`
	mutation deleteAuthor($id: ID!) {
		deleteAuthor(id: $id) {
			id
		}
	}
`;

export const reviewsByBook = gql`
	query reviewsByBook($bookId: String!) {
		reviewsByBook(bookId: $bookId) {
			id
			date
			text
		}
	}
`;
