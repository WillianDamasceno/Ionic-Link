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
