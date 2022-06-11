import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

const oneDayInSeconds = 60 * 60 * 24

type UserAuthInfo = {
	email: string
	authToken: string | null
	stayConnected: boolean | null
}

export const saveUserInfo = (user: UserAuthInfo) => {
	localStorage.setItem('userAuthInfo', JSON.stringify(user))
}

export const getSavedUserInfo = (): UserAuthInfo | null => {
	try {
		return JSON.parse(String(localStorage.getItem('userAuthInfo') || JSON.stringify('')))
	} catch {
		return null
	}
}

export const createJwtToken = (username: string, secretKey: string): string => {
	if (!(username || secretKey)) {
		return ''
	}

	const oneDayInSecondsFromNow = Math.floor(Date.now() / 1000) + oneDayInSeconds

	const token = sign(
		{
			expire: oneDayInSecondsFromNow * 30,
			username,
		},
		secretKey
	)

	return token
}

export const serializeHttpOnlyCookie = (key: string, token: string) => {
	const serialized = serialize(key, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: oneDayInSeconds * 30,
		path: '/'
	})

	return serialized
}
