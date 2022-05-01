type UserAuthInfo = {
	authToken: string | null
	stayConnected: boolean | null
}

export const saveUserInfo = ({ authToken, stayConnected }: UserAuthInfo) => {
	localStorage.setItem('userAuthInfo', JSON.stringify({ authToken, stayConnected }))
}

export const getSavedUserInfo = (): UserAuthInfo | null =>
	JSON.parse(String(localStorage.getItem('userAuthInfo') || String(null)))

export const createAuthToken = (): string => String(Math.random()).slice(2)
