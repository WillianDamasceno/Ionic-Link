import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { NEW_CLIENT, PUBLISH_CLIENT } from '../../../src/graphql/mutations'
import { gcms } from '../../../src/graphql/client'
import { createJwtToken } from '../../../src/utils/auth'

const secretKey = process.env.JWT_SECRET_KEY || ''

const registerNewClient = async (email: string, username: string, password: string) => {
	try {
		const authToken = createJwtToken(username, secretKey)

		const data = await gcms.request(NEW_CLIENT, {
			email,
			username,
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

const register = async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Only POST requests are allowed' })
	}

	const { email, username, password } = req.body
	console.log(req.body)

	if (!(email && username && password)) {
		return res.status(405).json({ success: false, message: 'Every field should be filled' })
	}

	const clientSensitiveInfo = await registerNewClient(email, username, password)

	await gcms.request(PUBLISH_CLIENT, { username })

	if (clientSensitiveInfo) {
		res.status(200).json({ success: true, response: clientSensitiveInfo })
	} else {
		res.status(400).json({ success: false, response: 'E-mail is invalid or already taken' })
	}
}

export default register
