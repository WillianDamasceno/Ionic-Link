import '../src/styles/dist/global.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Layout } from '../src/components/layout'

const MyApp = ({ Component, pageProps }:AppProps) => (
	<>
		<Head>
			<link rel='icon' href='#' />
		</Head>

		<Layout>
			<Component {...pageProps} />
		</Layout>
	</>
)

export default MyApp
