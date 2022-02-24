import { gql } from '@apollo/client'

export const CLIENT_NAME_BY_SENSITIVE_INFO = gql`
	query getSensitiveInfoByEmail($email: String!, $password: String!) {
		clients(where: { email: $email, password: $password }) {
			firstName
			authToken
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
	query getAllRegisteredLinks($email: String!) {
		clients(where: { email: $email }) {
			links {
				title
				url
				active
				type
			}
		}
	}
`
