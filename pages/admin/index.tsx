import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { getSavedUserInfo } from '../../src/utils/auth'

const Home = () => {
	const [links, setLinks] = useState([])

	useEffect(() => {
		const { authToken } = getSavedUserInfo() || {}

		if (!authToken) {
			Router.push('/auth/login')
		}

		(async () => {
			const linkFetch = await (
				await fetch('/api/links', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						authToken,
					}),
				})
			).json()

			const linkResponse = linkFetch.success ? linkFetch.response.registeredLinks : []

			setLinks(linkResponse)
		})()
	}, [])

	const logOut = () => {
		localStorage.setItem('userAuthInfo', '')

		Router.push('/auth/login')
	}

	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-8 bg-gray-100'>
				<div className='container h-max p-8 md:p-16 rounded-3xl bg-white shadow-lg'>
					<button
						type='button'
						onClick={logOut}
						className='
							w-max py-4 px-8 rounded-md
							text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-600
							outline-offset-2 accent-slate-400 transition'
					>
						Log Out
					</button>

					<h1 className='py-12 text-purple-500 bold text-7xl text-center'>Ionic Admin</h1>

					<h2 className='text-center'>Welcome to the Admin</h2>

					{links.length ? (
						links.map((link) => {
							const { id, title, url } = link

							return (
								<div key={id} className='p-4 my-4	 rounded border'>
									<div className='flex justify-between'>
										<p>{title}</p>
										<p>{url}</p>
									</div>

									{/* <p></p> */}
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
