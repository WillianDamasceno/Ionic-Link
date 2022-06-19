import { GraphQLClient } from 'graphql-request'

import { to } from '../utils'

export const gcms = new GraphQLClient(
	String(process.env.GRAPHCMS_ENDPOINT),
	{
		headers: {
			Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
		}
	}
)

const commonHeaders = {
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BasicApiConnectionParams = (route: string, variables?: object) => Promise<any>

const connectOnApi: BasicApiConnectionParams = async (route: string, variables = {}) => {
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

export const getRegisteredLinks = async () => connectOnApi('/api/links')

type createLinkParams = {
	title: string
	url: string,
}

export const createLink = async (linkInfo: createLinkParams) => connectOnApi('/api/links/create', linkInfo)
