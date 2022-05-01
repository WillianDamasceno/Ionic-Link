const validUrlDigits = [...new Set('abcdefghijklmnopqrstuvwxyz0123456789-')]

export const isValidDomainName = (domainName) => {
	const isValid = domainName
		.toLowerCase()
		.replaceAll(' ', '-')
		.split('')
		.every((domainDigit) => validUrlDigits.includes(domainDigit))

	return isValid
}
