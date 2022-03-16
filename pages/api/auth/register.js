import NextCors from 'nextjs-cors'

import { NEW_CLIENT, PUBLISH_CLIENT } from '../../../src/graphql/mutations'
import { gcms } from '../../../src/graphql/client'
import { createAuthToken } from '../../../src/utils/auth'

const registerNewClient = async (firstName, email, publicUrlName, password ) => {
	try {
		const authToken = createAuthToken()
		
		const data = await gcms.request(NEW_CLIENT, {
			firstName,
			email,
			publicUrlName,
			password,
			authToken
		})
	
		const { createClient: clientSensitiveInfo } = data
	
		return clientSensitiveInfo
	} catch (error) {
		console.error(error) // TODO: Find a way to keep the errors somewhere
		return false
	}
}

const register = async (req, res) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Only POST requests are allowed' })
	}

	const { firstName, email, publicUrlName, password } = req.body
	console.log(req.body)

	const clientSensitiveInfo = await registerNewClient(firstName, email, publicUrlName, password)

	await gcms.request(PUBLISH_CLIENT, {
		publicUrlName
	})

	clientSensitiveInfo
		? res.status(200).json({ success: true, response: clientSensitiveInfo})
		: res.status(404).json({ success: false, response: `E-mail is invalid or already taken` })
}

export default register
