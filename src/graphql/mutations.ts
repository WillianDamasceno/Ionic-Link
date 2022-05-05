import { gql } from 'graphql-request'

export const NEW_CLIENT = gql`
	mutation createNewClient($email: String!, $username: String!, $password: String!, $authToken: String!) {
		createClient (
			data: { email: $email, username: $username, password: $password, authToken: $authToken }
		) {
			email
			authToken
			username
		}
	}
`

export const PUBLISH_CLIENT = gql`
	mutation PublishClientByUsername($username: String!) {
		publishClient(where: { username: $username }) {
			authToken
		}
	}
`

export const UPDATE_PUBLISHED_USER_AUTH_TOKEN = gql`
	mutation UpdatePublishedUserAuthToken($authToken: String!, $username: String!, $email: String!) {
		updateClient(
			data: {authToken: $authToken}
			where: {username: $username, email: $email}
		) {
			authToken
		}
		publishClient(where: {username: $username}) {
			authToken
		}
	}
`

export const UPDATE_NON_PUBLISHED_USER_AUTH_TOKEN = gql`
	mutation UpdateNonPublishedUserAuthToken($authToken: String!, $username: String!, $email: String!) {
		updateClient(
			data: {authToken: $authToken}
			where: {username: $username, email: $email}
		) {
			authToken
		}
	}
`
