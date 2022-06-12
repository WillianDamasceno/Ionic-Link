import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { CLIENT_TOKEN_BY_EMAIL } from '../../../src/graphql/queries'
import { UPDATE_PUBLISHED_USER_AUTH_TOKEN } from '../../../src/graphql/mutations'
import { gcms } from '../../../src/graphql/client'
import { createJwtToken, serializeHttpOnlyCookie } from '../../../src/utils/auth'

const secretKey = process.env.JWT_SECRET_KEY || ''

const isExistentUser = async (email: string, password: string) => {
	try {
		const data = await gcms.request(CLIENT_TOKEN_BY_EMAIL, {
			email,
			password,
		})

		const username = data?.clients?.[0]?.username
		const userExists = Boolean(username)

		return {
			userExists,
			username
		}
	} catch (e) {
		console.log({ isExistentUserFunctionError: e })
		return {
			userExists: false,
			username: ''
		}
	}
}

const updateUserAuthToken = async (email: string, username: string, authToken: string) => {
	await gcms.request(UPDATE_PUBLISHED_USER_AUTH_TOKEN, {
		email,
		username,
		authToken,
	})
}

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, response: 'Only POST requests are allowed' })
	}

	const { email, password } = req.body

	if (!(email || password)) {
		return res.status(401).json({
			success: false,
			response: {
				message: 'Can not perform login because information are missing'
			}
		})
	}

	const { userExists, username } = await isExistentUser(email, password)

	if (userExists) {
		const jwtToken = createJwtToken(username, secretKey)
		const serializedCookie = serializeHttpOnlyCookie('jwtToken', jwtToken)

		await updateUserAuthToken(email, username, jwtToken)

		res.setHeader('Set-Cookie', serializedCookie)
		res.status(200).json({
			success: true,
			response: {
				username,
				isLoggedIn: true
			}
		})
	} else {
		res.status(404).json({
			success: false,
			response: {
				error: {
					message: 'The e-mail or the password is incorrect'
				},
				isLoggedIn: false
			}
		})
	}
}

export default login
