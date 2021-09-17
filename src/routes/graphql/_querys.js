import { gql } from '@apollo/client/core';

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

export const reviews = gql`
	query {
		reviews {
			id
			text
			book {
				title
			}
		}
	}
`;
