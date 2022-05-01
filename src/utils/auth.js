export const createAuthToken = () => crypto.randomUUID()

export const saveUserInfo = (authToken, stayConnected) => {
	localStorage.setItem('authToken', authToken)
	localStorage.setItem('stayConnected', String(stayConnected))
}

export const getSavedUserInfo = () => ({
	localAuthToken: localStorage.getItem('authToken'),
	localStayConnected: localStorage.getItem('stayConnected'),
})
