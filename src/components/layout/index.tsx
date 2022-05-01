import { Header } from './header'
import { Footer } from './footer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Layout = ({ children }: any) => (
	<>
		<Header />

		{children}

		<Footer />
	</>
)
