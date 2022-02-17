import Head from 'next/head'

import { useQuery, gql } from '@apollo/client'
import { currencyQuery } from '../src/graphql/queries'

const Home = () => {
	const { loading, error, data } = useQuery(currencyQuery)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :{error.message}</p>

	return (
		<>
			<Head>
				<title>SetMy.Link</title>
			</Head>

			{data.rates.map(rate => {
				return <p key={rate.currency}>{rate.currency}</p>
			})}
		</>
	)
}

export default Home
