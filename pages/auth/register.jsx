import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef } from 'react'

const Register = () => {
	const validUrlDigits = [...new Set('abcdefghijklmnopqrstuvwxyz0123456789-')]
	const publicUrlBase = 'ioniclink.com/'

	const [publicUrl, setPublicUrl] = useState(publicUrlBase)
	const [hasValidPublicUrl, setHasValidPublicUrl] = useState(true)

	const [isConfirmedPassword, setIsConfirmedPassword] = useState(true)
	const passwordInput = useRef(null)

	const isValidDomainName = (domainName, validDigits) => {
		const isValid = domainName
			.toLowerCase()
			.replaceAll(' ', '-')
			.split('')
			.every(domainDigit => validDigits.includes(domainDigit))

		return isValid
	}

	const renderInvalidDomainOrBrandNameError = () => {
		setHasValidPublicUrl(false)
	}

	const getPublicUrl = (baseUrl, domainOrBrandName) => {
		isValidDomainName(domainOrBrandName, validUrlDigits)
			? (setHasValidPublicUrl(true),
			  setPublicUrl(`${baseUrl}${domainOrBrandName.toLowerCase().replaceAll(' ', '-')}`))
			: renderInvalidDomainOrBrandNameError()
	}

	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-4 md:p-8 bg-gray-100 accent-purple-600'>
				<form className='grid gap-4 w-full max-w-4xl h-max p-8 md:p-12 rounded-3xl bg-white shadow-lg'>
					<h1 className='text-4xl'>Sign Up</h1>

					<div className='grid md:grid-cols-2 gap-4'>
						<div>
							<label
								htmlFor='register-input-first-name'
								className='inline-block px-4 py-2 cursor-pointer'
							>
								First Name
							</label>
							<input
								required
								type='text'
								tabIndex='1'
								id='register-input-first-name'
								placeholder='First Name'
								className='block w-full p-4 border border-gray-300 rounded-md'
							/>
						</div>

						<div>
							<label
								htmlFor='register-input-email'
								className='inline-block px-4 py-2 cursor-pointer'
							>
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
							<label
								htmlFor='register-input-password'
								className='inline-block px-4 py-2 cursor-pointer'
							>
								Password
							</label>
							<input
								required
								type='password'
								minLength={8}
								ref={passwordInput}
								id='register-input-password'
								placeholder='Password'
								className='block w-full p-4 border border-gray-300 rounded-md'
							/>
						</div>

						<div>
							<label
								htmlFor='register-input-password'
								className='inline-block px-4 py-2 cursor-pointer'
							>
								Confirm your Password
							</label>
							<input
								required
								type='password'
								minLength={8}
								id='register-input-password'
								placeholder='Confirm your Password'
								onBlur={({ target }) => {
									const { value: password } = passwordInput.current
									const { value: passwordConfirmation } = target

									password === passwordConfirmation || !passwordConfirmation
										? setIsConfirmedPassword(true)
										: setIsConfirmedPassword(false)
								}}
								className='block w-full p-4 border border-gray-300 rounded-md'
							/>
						</div>
					</div>

					<div
						className={`${
							isConfirmedPassword ? 'hidden' : ''
						} p-4 rounded-md text-red-700 font-semibold bg-red-400`}
					>
						The passwords does not match
					</div>

					<div className='grid md:grid-cols-2 gap-4'>
						<div>
							<label
								htmlFor='register-input-domain-name'
								className='inline-block px-4 py-2 cursor-pointer'
							>
								Your Domain or Brand Name
							</label>
							<input
								required
								type='text'
								id='register-input-domain-name'
								placeholder='Domain or Brand'
								onInput={({ target }) => getPublicUrl(publicUrlBase, target.value)}
								className='block w-full p-4 border border-gray-300 rounded-md'
							/>
						</div>

						<div>
							<label
								htmlFor='register-output-public-url-name'
								className='inline-block px-4 py-2 cursor-pointer'
							>
								This will be your Public URL
							</label>
							<output
								id='register-output-public-url-name'
								className='block w-full p-4 border border-gray-300 rounded-md overflow-x-hidden'
							>
								{publicUrl}
							</output>
						</div>
					</div>

					<div
						className={`${
							hasValidPublicUrl ? 'hidden' : ''
						} p-4 rounded-md text-red-700 font-semibold bg-red-400`}
					>
						Invalid Domain or Brand Name
					</div>

					<div className='flex gap-2'>
						<button className='w-max py-4 px-6 md:px-8 rounded-md text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-600 outline-offset-2 accent-slate-700 transition'>
							Register
						</button>

						<Link href='/auth/login'>
							<button className='w-fit py-4 px-3 md:px-4 rounded-md text-purple-800 hover:text-white active:text-white hover:bg-gray-500 outline-offset-2 active:bg-gray-600 transition'>
								Login with my account
							</button>
						</Link>
					</div>
				</form>
			</main>
		</>
	)
}

export default Register
