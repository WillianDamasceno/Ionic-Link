import { gql } from 'graphql-request'

export const NEW_CLIENT = gql`
	mutation createNewClient($firstName: String!, $email: String!, $publicUrlName: String!, $password: String!, $authToken: String!) {
		createClient(
			data: { firstName: $firstName, email: $email, publicUrlName: $publicUrlName, password: $password, authToken: $authToken }
		) {
			firstName
			email
			authToken
		}
	}
`

export const PUBLISH_CLIENT = gql`
	mutation PublishClientByPublicUrl($publicUrlName: String!) {
		publishClient(where: { publicUrlName: $publicUrlName}) {
			id
		}
	}
`
