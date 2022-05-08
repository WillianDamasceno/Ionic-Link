import { gql } from 'graphql-request'

export const CLIENT_TOKEN_BY_EMAIL = gql`
	query getSensitiveInfoByEmail($email: String!, $password: String!) {
		clients(where: { email: $email, password: $password }) {
			authToken
			email
			username
		}
	}
`

export const PUBLIC_CLIENT_URL_NANE = gql`
	query getUsername($email: String!) {
		clients(where: { email: $email }) {
			username
		}
	}
`

export const REGISTERED_LINKS = gql`
	query getAllRegisteredLinks($authToken: String!) {
		clients(where: { authToken: $authToken }) {
			links {
				id
				title
				url
				active
				type
			}
		}
	}
`
