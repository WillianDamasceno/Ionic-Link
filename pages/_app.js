import '../src/styles/dist/global.css'

import Head from 'next/head'

import { Layout } from '../src/components/layout'

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}

export default MyApp
