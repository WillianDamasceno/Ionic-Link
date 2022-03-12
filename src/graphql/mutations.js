import { gql } from 'graphql-request'

export const NEW_CLIENT = gql`
	mutation MyMutation($firstName: String!, $email: String!, $publicUrlName: String!, $password: String!) {
		createClient(
			data: { firstName: $firstName, email: $email, publicUrlName: $publicUrlName, password: $password }
		) {
			id
			firstName
			email
		}
	}
`

export const PUBLISH_CLIENT = gql`
	mutation PublishClientByEmail($email: String!) {
		publishClient(where: {email: $email}) {
			id
		}
	}
`
