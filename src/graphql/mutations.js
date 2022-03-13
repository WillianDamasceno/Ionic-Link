import { gql } from 'graphql-request'

export const NEW_CLIENT = gql`
	mutation createNewClient($firstName: String!, $email: String!, $publicUrlName: String!, $password: String!, $authToken: String!) {
		createClient(
			data: { firstName: $firstName, email: $email, publicUrlName: $publicUrlName, password: $password, authToken: $authToken }
		) {
			firstName
			email
			authToken
			publicUrlName
		}
	}
`

export const PUBLISH_CLIENT = gql`
	mutation PublishClientByPublicUrl($publicUrlName: String!) {
		publishClient(where: { publicUrlName: $publicUrlName }) {
			authToken
		}
	}
`

export const UPDATE_PUBLISHED_USER_AUTH_TOKEN = gql`
	mutation UpdatePublishedUserAuthToken($authToken: String!, $publicUrlName: String!, $email: String!) {
		updateClient(
			data: {authToken: $authToken}
			where: {publicUrlName: $publicUrlName, email: $email}
		) {
			authToken
		}
		publishClient(where: {publicUrlName: $publicUrlName}) {
			authToken
		}
	}
`

export const UPDATE_NON_PUBLISHED_USER_AUTH_TOKEN = gql`
	mutation UpdateNonPublishedUserAuthToken($authToken: String!, $publicUrlName: String!, $email: String!) {
		updateClient(
			data: {authToken: $authToken}
			where: {publicUrlName: $publicUrlName, email: $email}
		) {
			authToken
		}
	}
`
