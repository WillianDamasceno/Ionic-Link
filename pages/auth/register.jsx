import Head from 'next/head'
import Link from 'next/link'

const Register = () => {
	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-4 md:p-8 bg-gray-100 accent-purple-600'>
				<form className='grid gap-4 w-full max-w-4xl h-max p-8 md:p-12 rounded-3xl bg-white shadow-lg'>
					<div>
						<label htmlFor='register-input-first-name' className='inline-block px-4 py-2 cursor-pointer'>
							First Name
						</label>
						<input
							required
							type='text'
							id='register-input-first-name'
							placeholder='First Name'
							className='block w-full p-4 border border-gray-300 rounded-md'
						/>
					</div>
					
					<div className='grid md:grid-cols-2 gap-4'>
						<div>
							<label htmlFor='register-input-email' className='inline-block px-4 py-2 cursor-pointer'>
								E-mail
							</label>
							<input
								required
								type='email'
								id='register-input-email'
								placeholder='E-mail'
								className='block w-full p-4 border border-gray-300 rounded-md'
							/>
						</div>

						<div>
							<label htmlFor='register-input-password' className='inline-block px-4 py-2 cursor-pointer'>
								Password
							</label>
							<input
								required
								type='password'
								id='register-input-password'
								placeholder='Password'
								className='block w-full p-4 border border-gray-300 rounded-md'
							/>
						</div>
					</div>
					
					<div className='grid md:grid-cols-2 gap-4'>
						<div>
							<label htmlFor='register-input-public-url-name' className='inline-block px-4 py-2 cursor-pointer'>
								Public URL Name
							</label>
							<input
								required
								type='text'
								id='register-input-public-url-name'
								placeholder='Public URL Name'
								className='block w-full p-4 border border-gray-300 rounded-md'
							/>
						</div>

						<div>
							<label htmlFor="register-output-public-url-name" className='inline-block px-4 py-2 cursor-pointer'>This will be your public URL</label>
							<output id='register-output-public-url-name' className='block w-full p-4 border border-gray-300 rounded-md'>ioniclink.com/</output>
						</div>
					</div>

					<button className='w-max py-4 px-8 rounded-md text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-600 transition'>
						Register
					</button>

					<Link href='/auth/register'>
						<a className='w-max text-purple-800 hover:text-purple-500 underline'>Register with my account</a>
					</Link>
				</form>
			</main>
		</>
	)
}

export default Register
