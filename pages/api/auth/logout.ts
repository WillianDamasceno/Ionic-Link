import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { serializeHttpOnlyCookie } from '../../../src/utils/auth';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	// TODO: Check if the user has a JWT token
	// TODO: If not, return an "error", wow
	console.log('123')

	const serializedCookie = serializeHttpOnlyCookie('jwtToken', '')
	res.setHeader('Set-Cookie', serializedCookie)

	res.status(301).redirect('/auth/login')
}

export default login
