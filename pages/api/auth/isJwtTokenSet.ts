import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
		optionsSuccessStatus: 200,
	})

	res.status(200).json({
		success: true,
		response: {
			isJwtTokenSet: Boolean(req.cookies.jwtToken)
		}
	})
}

export default login
