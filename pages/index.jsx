import Head from 'next/head'

const Home = () => {
	return (
		<>
			<Head>
				<title>SetMy.Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-8 bg-gray-100'>
				<div className='max-w-5xl h-max px-16 py-28 rounded-3xl bg-white shadow-md hover:shadow-xl transition-shadow'>
					<h1 className='pb-12 text-purple-500 bold text-7xl text-center'>Ionic Link</h1>

					<h2 className='pb-8 text-purple-400 text-3xl text-center '>Thank you for visiting our website!</h2>

					<p className='text-gray-600'>
						This website is in development, and its main idea is to be a Link Tree, where you can register unlimited links that have a slug, or just a short version of it.
					</p>

					<p className='text-gray-600'>
						You can also peek one of our page templates to show your link to the people.
					</p>
				</div>
			</main>
		</>
	)
}

export default Home
