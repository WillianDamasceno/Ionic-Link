import { GraphQLClient } from 'graphql-request'

import { to } from '../utils/promises'

export const gcms = new GraphQLClient(String(process.env.GRAPHCMS_ENDPOINT))

const commonHeaders = {
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BasicApiConnectionParams = (route: string, variables: object) => Promise<any>

const connectOnApi: BasicApiConnectionParams = async (route: string, variables: object) => {
	const [error, res] = await to(
		fetch(route, {
			method: 'POST',
			...commonHeaders,
			body: JSON.stringify(variables),
		})
	)

	return error || res.json()
}

export const registerClient = async (email: string, password: string, username: string) =>
	connectOnApi('/api/auth/register', {
		email,
		password,
		username,
	})

export const getClientToken = async (email: string, password: string) =>
	connectOnApi('/api/auth/login', { email, password })

export const getRegisteredLinks = async (authToken: string) => connectOnApi('/api/links', { authToken })

type createLinkParams = {
	title: string
	url: string
	clientIdentifier: {
		connect: {
			email: string
		}
	}
}

export const createLink = async (linkInfo: createLinkParams) => connectOnApi('/api/links/create', linkInfo)
