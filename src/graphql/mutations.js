import { gql } from '@apollo/client'

const NEW_CLIENT = gql`
	mutation createNewClient(
		$firstName: String!,
		$email: String!,
		$password: String!,
		$publicUrlName: String!
	) {
		createClient(
			data: {
				firstName: $firstName,
				email: $email,
				password: $password,
				publicUrlName: $publicUrlName
			}
		) {
			id
			firstName
			authToken
		}
	}
`
