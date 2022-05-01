import { gql } from 'graphql-request'

export const CLIENT_NAME_BY_SENSITIVE_INFO = gql`
	query getSensitiveInfoByEmail($email: String!, $password: String!) {
		clients(where: { email: $email, password: $password }) {
			authToken
			email
			publicUrlName
		}
	}
`

export const PUBLIC_CLIENT_URL_NANE = gql`
	query getPublicUrl($email: String!) {
		clients(where: { email: $email }) {
			publicUrlName
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
