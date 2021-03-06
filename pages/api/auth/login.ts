import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { CLIENT_TOKEN_BY_EMAIL } from '../../../src/graphql/queries'
import { UPDATE_NON_PUBLISHED_USER_AUTH_TOKEN } from '../../../src/graphql/mutations'
import { gcms } from '../../../src/graphql/client'
import { createAuthToken } from '../../../src/utils/auth'

const getClientInfoFromCms = async (email:string, password:string) => {
	try {
		const data = await gcms.request(CLIENT_TOKEN_BY_EMAIL, {
			email,
			password,
		})

		const {
			clients: [clientSensitiveInfo],
		} = data
		const { authToken, username } = clientSensitiveInfo

		clientSensitiveInfo.authToken = authToken || createAuthToken()

		if (clientSensitiveInfo.authToken !== authToken) {
			await gcms.request(UPDATE_NON_PUBLISHED_USER_AUTH_TOKEN, {
				email,
				username,
				authToken,
			})
		}

		return clientSensitiveInfo
	} catch (error) {
		console.error(error) // TODO: Find a way to keep the errors somewhere
		return false
	}
}

// eslint-disable-next-line consistent-return
const login = async (req:NextApiRequest, res:NextApiResponse) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, response: 'Only POST requests are allowed' })
	}

	const { email, password } = req.body

	const clientSensitiveInfo = await getClientInfoFromCms(email, password)

	if (clientSensitiveInfo) {
		res.status(200).json({ success: true, response: clientSensitiveInfo })
	} else {
		res.status(404).json({ success: false, response: 'The e-mail or the password is incorrect' })
	}
}

export default login
