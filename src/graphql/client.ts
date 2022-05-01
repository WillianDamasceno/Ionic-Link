import { GraphQLClient } from 'graphql-request'

export const gcms = new GraphQLClient(String(process.env.GRAPHCMS_ENDPOINT))

const commonHeaders = {
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
}

export const getClientToken = async (email: string, password: string) => (
	await fetch('/api/auth/login', {
		...commonHeaders,
		body: JSON.stringify({
			email,
			password,
		}),
	})
).json()

export const getRegisteredLinks = async (authToken: string) => {
	const linkFetch = await (
		await fetch('/api/links', {
			...commonHeaders,
			body: JSON.stringify({
				authToken,
			}),
		})
	).json()

	const linkResponse = linkFetch.success ? linkFetch.response.registeredLinks : []

	return linkResponse
}
