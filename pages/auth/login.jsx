import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

import { Form, Alert } from '../../src/components'

const Login = () => {
	const saveUserInfo = (authToken, stayConnected) => {
		localStorage.setItem('authToken', authToken)
		localStorage.setItem('stayConnected', String(stayConnected))
	}

	const getSavedUserInfo = () => ({
		localAuthToken: localStorage.getItem('authToken'),
		localStayConnected: localStorage.getItem('stayConnected'),
	})

	useEffect(() => {
		const userInfo = getSavedUserInfo()

		if (userInfo.localStayConnected && userInfo.localAuthToken) {
			window.location = '/admin'
		}
	})

	// Redirect if the authToken in the storage is valid
	const connectUser = async (email, password) => (
		await fetch('/api/auth/login', {
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

	const stayConnected = useRef(null)

	const keepUserConnected = (userConnectionResponde) => {
		console.log(userConnectionResponde)

		saveUserInfo(userConnectionResponde.authToken, stayConnected.current.checked)
	}

	const [connectionWorked, setConnectionWorked] = useState(true)

	const handleUserConnection = async (userConnectionAttempt) => {
		setConnectionWorked(true)

		const userConnectionStatus = await userConnectionAttempt
		const connectionResponse = userConnectionStatus.response

		if (userConnectionStatus.success) {
			keepUserConnected(connectionResponse)
			window.location = '/admin'
		} else {
			setConnectionWorked(false)
		}
	}

	const [isAllowedToLogin, setIsAllowedToLogin] = useState(false)
	const emailInput = useRef(null)
	const passwordInput = useRef(null)
	const loginButton = useRef(null)

	useEffect(() => {
		const loginForm = document.querySelector('.login-form')
		const everyFormField = [...loginForm.querySelectorAll('input:not([type="checkbox"])')]

		loginForm.addEventListener('input', () => {
			const { length: passwordLength } = passwordInput.current.value

			if (passwordLength >= 8 && everyFormField.every((field) => field.value)) {
				setIsAllowedToLogin(true)
			} else {
				setIsAllowedToLogin(false)
			}
		})
	}, [])

	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-4 md:p-8'>
				<form className='
						login-form grid gap-4 w-full max-w-lg h-max p-8 md:p-12 rounded-3xl bg-white shadow-xl
					'
				>
					<h1 className='text-4xl'>Login</h1>

					<Form.Input
						inputId='email'
						type='email'
						label='E-mail'
						inputRef={emailInput}
						title='Type your Registered E-mail'
						autoFocus
					/>

					<Form.Input
						inputId='password'
						type='password'
						inputRef={passwordInput}
						minLength='8'
						label='Password'
						title='Type your password'
					/>

					<div title='Click to Login Automatically'>
						<input
							ref={stayConnected}
							type='checkbox'
							id='stay-connected'
							className='w-max mr-2 cursor-pointer'
						/>
						<label htmlFor='stay-connected' className='cursor-pointer'>
							Stay connected
						</label>
					</div>

					<div className='flex gap-2'>
						<button
							type={isAllowedToLogin ? 'button' : 'submit'}
							ref={loginButton}
							onClick={async () => {
								const { value: email } = emailInput.current
								const { value: password } = passwordInput.current

								if (loginButton.current.type === 'button') {
									await handleUserConnection(connectUser(email, password))
								}
							}}
							className='
								login-button w-max py-4 px-8 rounded-md
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

					<Alert.Error isHidden={connectionWorked} message='The E-mail or the password is incorrect' />
				</form>
			</main>
		</>
	)
}

export default Login
