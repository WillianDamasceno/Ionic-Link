const validDomainCharacters = [...new Set('abcdefghijklmnopqrstuvwxyz0123456789-')]

export const isValidDomainName = (domainName) => {
	const isValid = domainName
		.toLowerCase()
		.replaceAll(' ', '-')
		.split('')
		.every((domainCharacter) => validDomainCharacters.includes(domainCharacter))

	return isValid
}
