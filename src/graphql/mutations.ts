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

export const CREATE_LINK = gql`
	mutation CreateLink($title: String!, $url: String!, $clientIdentifier: ClientCreateOneInlineInput!) {
		createLink(data: {title: $title, url: $url, active: true, client: $clientIdentifier}) {
			id
			title
			url
			active
		}
	}
`

export const PUBLISH_LINK = gql`
	mutation PublishLink($linkId: ID!) {
		publishLink(where: {id: $linkId}) {
			id
			title
		}
	}
`
