import { Header } from './header'
import { Footer } from './footer'

export const Layout = ({ children }) => (
	<>
		<Header />

		{children}

		<Footer />
	</>
)
