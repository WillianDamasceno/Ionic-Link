import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { NEW_CLIENT, PUBLISH_CLIENT } from '../../../src/graphql/mutations'
import { gcms } from '../../../src/graphql/client'
import { createAuthToken } from '../../../src/utils/auth'

const registerNewClient = async (email: string, publicUrlName: string, password: string) => {
	try {
		const authToken = createAuthToken()

		const data = await gcms.request(NEW_CLIENT, {
			email,
			publicUrlName,
			password,
			authToken,
		})

		const { createClient: clientSensitiveInfo } = data

		return clientSensitiveInfo
	} catch (error) {
		console.error(error) // TODO: Find a way to keep the errors somewhere
		return false
	}
}

// eslint-disable-next-line consistent-return
const register = async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Only POST requests are allowed' })
	}

	const { email, publicUrlName, password } = req.body

	const clientSensitiveInfo = await registerNewClient(email, publicUrlName, password)

	await gcms.request(PUBLISH_CLIENT, {
		publicUrlName,
	})

	if (clientSensitiveInfo) {
		res.status(200).json({ success: true, response: clientSensitiveInfo })
	} else {
		res.status(404).json({ success: false, response: 'E-mail is invalid or already taken' })
	}
}

export default register
