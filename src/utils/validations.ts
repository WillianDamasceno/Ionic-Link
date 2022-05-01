const validDomainCharacters = [...new Set('abcdefghijklmnopqrstuvwxyz0123456789-')]

export const isValidDomainName = (domainName: string) => {
	const isValid = domainName
		.toLowerCase()
		.replaceAll(' ', '-')
		.split('')
		.every((domainCharacter: string) => validDomainCharacters.includes(domainCharacter))

	return isValid
}
