import '../src/styles/dist/global.css'

import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'

import { Layout } from '../src/components/layout'
import { client } from '../src/graphql/client'

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
