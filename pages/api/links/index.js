import NextCors from 'nextjs-cors'

import { gcms } from '../../../src/graphql/client'
import { REGISTERED_LINKS } from '../../../src/graphql/queries'

const links = async (req, res) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Only POST requests are allowed' })
	}

	const { authToken } = req.body

	const {
		clients: [{ links: registeredLinks }],
	} = await gcms.request(REGISTERED_LINKS, {
		authToken,
	})

	console.log(registeredLinks)

	res.status(200).json({ success: true, response: { registeredLinks } })
}

export default links
