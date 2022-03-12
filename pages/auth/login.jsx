import Head from 'next/head'
import Link from 'next/link'

const Login = () => {
	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-4 md:p-8 bg-gray-100 accent-purple-600'>
				<form className='grid gap-4 w-full max-w-md h-max p-8 md:p-12 rounded-3xl bg-white shadow-lg'>
					<div>
						<label htmlFor='login-input-email' className='inline-block px-4 py-2 cursor-pointer'>
							E-mail
						</label>
						<input
							required
							type='email'
							id='login-input-email'
							placeholder='E-mail'
							className='block w-full p-4 border border-gray-300 rounded-md'
						/>
					</div>

					<div>
						<label htmlFor='login-input-password' className='inline-block px-4 py-2 cursor-pointer'>
							Password
						</label>
						<input
							required
							type='password'
							id='login-input-password'
							placeholder='Password'
							className='block w-full p-4 border border-gray-300 rounded-md'
						/>
					</div>

					<div>
						<input type='checkbox' id='stay-signed-in' className='w-max mr-2 cursor-pointer' />
						<label htmlFor='stay-signed-in' className='cursor-pointer'>Stay signed in</label>
					</div>

					<button className='w-max py-4 px-8 rounded-md text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-600 transition'>
						Login
					</button>

					<Link href='/auth/register'>
						<a className='w-max text-purple-800 hover:text-purple-500 underline'>Create an account</a>
					</Link>
				</form>
			</main>
		</>
	)
}

export default Login
