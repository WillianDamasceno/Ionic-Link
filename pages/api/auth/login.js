import NextCors from 'nextjs-cors'

import { CLIENT_NAME_BY_SENSITIVE_INFO } from '../../../src/graphql/queries'
import { gcms } from '../../../src/graphql/client'
import { createAuthToken } from '../../../src/utils/auth'

const getClientInfoFromCms = async (email, password) => {
	try {
		const data = await gcms.request(CLIENT_NAME_BY_SENSITIVE_INFO, {
			email,
			password,
		})
	
		const { clients: [ clientSensitiveInfo ] } = data
		const { authToken } = clientSensitiveInfo
	
		clientSensitiveInfo.authToken = authToken || createAuthToken()
	
		return clientSensitiveInfo
	} catch (error) {
		console.error(error) // TODO: Find a way to keep the errors somewhere
		return false
	}
}

const login = async (req, res) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Only POST requests are allowed' })
	}

	const { email, password } = req.body

	const clientSensitiveInfo = await getClientInfoFromCms(email, password)
	console.log(clientSensitiveInfo)

	clientSensitiveInfo
		? res.status(200).json(clientSensitiveInfo)
		: res.status(404).json({ success: false, message: `The e-mail or the password is incorrect` })
}

export default login
