import '../src/styles/dist/global.css'

import Head from 'next/head'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client'

import { Layout } from '../src/components/layout'

const client = new ApolloClient({
	uri: 'https://48p1r2roz4.sse.codesandbox.io',
	cache: new InMemoryCache(),
})

const MyApp = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	)
}

export default MyApp
