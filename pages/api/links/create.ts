import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { PUBLISH_LINK, CREATE_LINK } from '../../../src/graphql/mutations';

import { gcms } from '../../../src/graphql/client'

// eslint-disable-next-line consistent-return
const links = async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Only POST requests are allowed' })
	}

	const { title, url, clientIdentifier } = req.body

	if (!(title && url && clientIdentifier)) {
		return res.status(200).json({ success: false, message: 'Every field must be filled' })
	}

	const linkCreationResponse = await gcms.request(CREATE_LINK, {
		title,
		url,
		clientIdentifier
	})

	await gcms.request(PUBLISH_LINK, {
		linkId: linkCreationResponse?.createLink?.id
	})

	res.status(200).json({ success: true, response: linkCreationResponse })
}

export default links
