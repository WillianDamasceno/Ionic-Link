import Head from 'next/head'
import Link from 'next/link'

const Login = () => {
	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-4 md:p-8 bg-gray-100 accent-purple-600'>
				<form className='grid gap-4 w-full max-w-lg h-max p-8 md:p-12 rounded-3xl bg-white shadow-xl'>
					<h1 className='text-4xl'>Login</h1>

					<div>
						<label htmlFor='login-input-email' className='inline-block px-4 py-2 cursor-pointer'>
							E-mail
						</label>
						<input
							required
							type='email'
							tabIndex='1'
							id='login-input-email'
							placeholder='E-mail'
							title='Type your Registered E-mail'
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
							title='Type your Password'
							className='block w-full p-4 border border-gray-300 rounded-md'
						/>
					</div>

					<div title='Click to Login Automatically'>
						<input type='checkbox' id='stay-signed-in' className='w-max mr-2 cursor-pointer' />
						<label htmlFor='stay-signed-in' className='cursor-pointer'>
							Stay signed in
						</label>
					</div>

					<div className='flex gap-2'>
						<button className='w-max py-4 px-8 rounded-md text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-600 outline-offset-2 accent-slate-700 transition'>
							Login
						</button>

						<Link href='/auth/register'>
							<button className='w-fit px-4 rounded-md text-purple-800 hover:text-white active:text-white hover:bg-gray-500 outline-offset-2 active:bg-gray-600 transition'>
								Create an account
							</button>
						</Link>
					</div>
				</form>
			</main>
		</>
	)
}

export default Login
