import NextCors from 'nextjs-cors'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { CLIENT_NAME_BY_SENSITIVE_INFO } from '../../../src/graphql/queries'

const client = new ApolloClient({
	uri: process.env.GRAPHCMS_ENDPOINT,
	cache: new InMemoryCache(),
})

const handler = async (req, res) => {
	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Only POST requests are allowed' })
	}

	const { email, password } = req.body

	const {
		data: {
			clients: [clientSensitiveInfo],
		},
	} = await client.query({
		query: CLIENT_NAME_BY_SENSITIVE_INFO,
		variables: {
			email,
			password,
		},
	})

	if (clientSensitiveInfo) {
		if (clientSensitiveInfo.authToken) {
			clientSensitiveInfo.authToken = setAuthToken()
		}

		const { firstName, authToken } = clientSensitiveInfo

		res.status(200).json({
			firstName,
			authToken,
			email,
		})
	} else {
		res.status(404).json({ success: false, message: `The e-mail or the password is incorrect` })
	}
}

export default handler
