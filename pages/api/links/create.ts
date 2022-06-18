import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { PUBLISH_LINK, CREATE_LINK } from '../../../src/graphql/mutations'
import { GET_EMAIL_BY_AUTH_TOKEN } from '../../../src/graphql/queries'

import { gcms } from '../../../src/graphql/client'

const links = async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Only POST requests are allowed' })
	}

	if (!req.cookies.jwtToken) {
		// TODO: Verify the right HTTP Code for this
		return res.status(400).redirect('/auth/login')
	}

	const { title, url } = req.body

	if (!(title && url)) {
		return res.status(200).json({ success: false, message: 'Every field must be filled' })
	}

	const {
		clients: [{ email }],
	} = await gcms.request(GET_EMAIL_BY_AUTH_TOKEN, {
		authToken: req.cookies.jwtToken,
	})

	if (email) {
		const linkCreationResponse = await gcms.request(CREATE_LINK, {
			title,
			url,
			clientIdentifier: {
				connect: {
					email,
				},
			},
		})

		await gcms.request(PUBLISH_LINK, {
			linkId: linkCreationResponse?.createLink?.id,
		})

		return res.status(200).json({ success: true, response: linkCreationResponse })
	}

	// TODO: Verify the right HTTP Code for this
	res.status(401).json({
		success: false,
		response: {
			error: {
				message: 'The link creation failed',
			},
		},
	})
}

export default links
