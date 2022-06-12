import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState, useRef } from 'react'
import type { FormEvent } from 'react'

import { Form, Alert } from '../../src/components'

const isValidEmail = (email: string) => {
	const MIN_EMAIL_LENGTH = 6

	const validEmailLength = email.length >= MIN_EMAIL_LENGTH

	return validEmailLength
}

const isValidPassword = (password: string) => {
	const MIN_PASSWORD_LENGTH = 8
	const invalidPasswords = Object.freeze(['undefined', 'null'])

	const validPasswordLength = password.length >= MIN_PASSWORD_LENGTH
	const validPassword = invalidPasswords.every((invalid) => invalid !== password)

	return validPasswordLength && validPassword
}

const Login = () => {
	// const router = useRouter()

	// TODO: Create a hook called useAuth and put this useEffect inside of it
	useEffect(() => {
		fetch('http://localhost:3000/api/auth/isJwtTokenSet')
			.then((res) => res.json())
			.then((res) => {
				if (res.success && res.response.isJwtTokenSet) {
					Router.push('/admin')
				}
			})
	}, [])

	const emailInputRef = useRef<HTMLInputElement>(null)
	const passwordInputRef = useRef<HTMLInputElement>(null)
	const stayConnectedCheckboxRef = useRef<HTMLInputElement>(null)

	// TODO: Change the localhost to an env variable
	const login = async (email: string, password: string) =>
		(
			await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			})
		).json()

	const [isHiddenAlert, setIsHiddenAlert] = useState(true)

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault()

		const email = String(emailInputRef.current?.value)
		const password = String(passwordInputRef.current?.value)
		// TODO: Define a login of staying connected and implement it
		// const stayConnected = stayConnectedCheckboxRef.current?.value

		if (!isValidEmail(email)) {
			// TODO: Handle invalid E-mails
			return console.log('Invalid E-mail')
		}

		if (!isValidPassword(password)) {
			// TODO: Handle invalid passwords
			return console.log('Invalid Password')
		}

		try {
			const { success, response } = await login(email, password)

			if (!success) {
				setIsHiddenAlert(false)
				return console.log({ isLoggedIn: response.isLoggedIn })
			}

			// TODO: Use the isJwtTokenSet api route to check id the auth is done
			// and then redirect the user to the admin page
			Router.push('/admin')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center p-4 mt-4 md:p-8'>
				<form
					className='
						login-form grid gap-4 w-full max-w-lg h-max p-8 md:p-12 rounded-3xl bg-white shadow-xl
					'
					onSubmit={handleLogin}
					onInput={() => setIsHiddenAlert(true)}
				>
					<h1 className='text-4xl'>Login</h1>

					<Form.Input
						inputId='email'
						type='email'
						label='E-mail'
						minLength='6'
						reference={emailInputRef}
						title='Type your Registered E-mail'
						autoFocus
					/>

					<Form.Input
						inputId='password'
						type='password'
						reference={passwordInputRef}
						minLength='8'
						label='Password'
						title='Type your password'
					/>

					<Form.Checkbox
						inputId='stay-connected'
						reference={stayConnectedCheckboxRef}
						label='Stay connected'
						title='Click to Login Automatically'
					/>

					<div className='flex gap-2'>
						<button
							type='submit'
							className='
								login-button w-max py-3 px-8 rounded-md
								text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-600
								outline-offset-2 accent-slate-400 transition
							'
						>
							Login
						</button>

						<Link href='/auth/register'>
							<button
								type='button'
								className='
									w-fit px-4 rounded-md
									text-purple-800 hover:text-white active:text-white hover:bg-gray-500
									outline-offset-2 active:bg-gray-600 transition
								'
							>
								Create an account
							</button>
						</Link>
					</div>

					<Alert.Error isHidden={isHiddenAlert} message='The E-mail or the password is incorrect' />
				</form>
			</main>
		</>
	)
}

export default Login
