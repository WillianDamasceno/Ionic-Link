import Head from 'next/head'
import { useEffect, useState } from 'react'

const Home = () => {
	const [links, setLinks] = useState([])

	useEffect(async () => {
		const localAuthToken = localStorage.getItem('authToken')

		if (!localAuthToken) {
			window.location.href = '/auth/login'
		}

		const linkFetch = await (
			await fetch('/api/links', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					authToken: localAuthToken,
				}),
			})
		).json()

		const linkResponse = linkFetch.success ? linkFetch.response.registeredLinks : []

		setLinks(linkResponse)
	}, [])

	const logOut = () => {
		localStorage.setItem('authToken', '')
		localStorage.setItem('stayConnected', '')

		window.location.href = '/auth/login'
	}

	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-8 bg-gray-100'>
				<div className='container h-max p-8 md:p-16 rounded-3xl bg-white shadow-lg'>
					<button
						onClick={logOut}
						className='w-max py-4 px-8 rounded-md text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-600 outline-offset-2 accent-slate-700 transition'
					>
						Log Out
					</button>

					<h1 className='py-12 text-purple-500 bold text-7xl text-center'>Ionic Admin</h1>

					<h2 className='text-center'>Welcome to the Admin</h2>

					{links.length ? (
						links.map(link => {
							const { id, title, url } = link

							return (
								<div key={id} className='p-4 my-4	 rounded border'>
									<div className='flex justify-between'>
										<p>{title}</p>
										<p>{url}</p>
									</div>

									<p></p>
								</div>
							)
						})
					) : (
						<p className='text-center'>Links not Found</p>
					)}
				</div>
			</main>
		</>
	)
}

export default Home
