type UserAuthInfo = {
	email: string
	authToken: string | null
	stayConnected: boolean | null
}

export const saveUserInfo = ({ email, authToken, stayConnected }: UserAuthInfo) => {
	localStorage.setItem('userAuthInfo', JSON.stringify({ email, authToken, stayConnected }))
}

export const getSavedUserInfo = (): UserAuthInfo | null => {
	try {
		return JSON.parse(String(localStorage.getItem('userAuthInfo') || JSON.stringify('')))
	} catch {
		return null
	}
}

export const createAuthToken = (): string => String(Math.random()).slice(2)
