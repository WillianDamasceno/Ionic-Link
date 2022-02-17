import { gql } from '@apollo/client'

export const currencyQuery = gql`
	query GetRates {
		rates(currency: "USD") {
			currency
		}
	}
`