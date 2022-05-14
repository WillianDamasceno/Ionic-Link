import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { getRegisteredLinks, createLink } from '../../src/graphql/client'
import { getSavedUserInfo } from '../../src/utils/auth'
import { Form } from '../../src/components'

interface Link {
	id: string
	title: string
	url: string
}

interface RegisteredLinks {
	links: Link[]
}

const LinkList = ({ links }: RegisteredLinks) => (
	<div>
		{links.length ? (
			links.map((link) => {
				const { id, title, url } = link

				return (
					<div key={id} className='flex justify-between gap-4 p-4 my-4 rounded border'>
						<p>{title}</p>
						<p>{url}</p>
					</div>
				)
			})
		) : (
			<p className='text-center'>Links not Found</p>
		)}
	</div>
)

const Home = () => {
	const [links, setLinks] = useState([])

	useEffect(() => {
		const { authToken } = getSavedUserInfo() || {}

		if (!authToken) {
			Router.push('/auth/login')
			return
		}

		getRegisteredLinks(authToken).then((res) => setLinks(res.response.registeredLinks))
	}, [])

	const logOut = () => {
		localStorage.setItem('userAuthInfo', '')

		Router.push('/auth/login')
	}

	const titleRef = useRef<HTMLInputElement>(null)
	const linkRef = useRef<HTMLInputElement>(null)
	const registerLinkRef = useRef<HTMLButtonElement>(null)

	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='p-8 bg-gray-100'>
				<div className='container h-max mx-auto p-8 md:p-16 rounded-3xl bg-white shadow-lg'>
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

					<div className='flex gap-4 items-end flex-wrap py-4'>
						<button
							type='button'
							ref={registerLinkRef}
							className='
								w-max py-3 px-6 md:px-8 rounded
								text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-600
								outline-offset-2 accent-slate-400 transition
							'
							onClick={() => {
								const res = createLink({
									title: String(titleRef.current?.value),
									url: String(linkRef.current?.value),
									clientIdentifier: {
										connect: {
											email: String(getSavedUserInfo()?.email)
										}
									},
								})

								res.then(console.log)
							}}
						>
							Add a link
						</button>

						<Form.Input reference={titleRef} inputId='title-input' label='Title' />
						<Form.Input reference={linkRef} inputId='link-input' label='Link' />
					</div>

					<LinkList links={links} />
				</div>
			</main>
		</>
	)
}

export default Home
