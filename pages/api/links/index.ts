import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { gcms } from '../../../src/graphql/client'
import { REGISTERED_LINKS } from '../../../src/graphql/queries'

const links = async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'GET') {
		return res.status(405).json({ success: false, message: 'Only GET requests are allowed' })
	}

	const {
		clients: [{ links: registeredLinks }],
	} = await gcms.request(REGISTERED_LINKS, {
		authToken: req.cookies.jwtToken,
	})

	if (registeredLinks) {
		return res.status(200).json({ success: true, response: { registeredLinks } })
	}

	res.status(200).json({ success: false, response: { error: { message: 'No links found' } } })
}

export default links
