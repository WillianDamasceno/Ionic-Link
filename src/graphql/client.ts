import { GraphQLClient } from 'graphql-request'

export const gcms = new GraphQLClient(String(process.env.GRAPHCMS_ENDPOINT))

const commonHeaders = {
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
}

const connectOnApi = async (route: string, variables: object) => {
	const res = await fetch(route, {
		method: 'POST',
		...commonHeaders,
		body: JSON.stringify(variables)
	})

	return res.json()
}

export const getClientToken = async (email: string, password: string) =>
	connectOnApi('/api/auth/login', { email, password })

export const getRegisteredLinks = async (authToken: string) => {
	const linkFetch = await connectOnApi('/api/links', { authToken })

	const linkResponse = linkFetch.success ? linkFetch.response.registeredLinks : []

	return linkResponse
}
