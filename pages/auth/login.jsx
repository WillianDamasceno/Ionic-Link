import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

import { Form, Alert } from '../../src/components'
import { saveUserInfo, getSavedUserInfo } from '../../src/utils/auth'
import { getClientToken } from '../../src/graphql/client'

const Login = () => {
	useEffect(() => {
		const { localAuthToken, localStayConnected } = getSavedUserInfo()

		if (localStayConnected && localAuthToken) {
			window.location = '/admin'
		}
	})

	const stayConnected = useRef(null)

	const keepUserConnected = (userConnectionResponde) => {
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
			return
		}

		setConnectionWorked(false)
	}

	const [loginPermission, setLoginPermission] = useState(false)
	const emailInput = useRef(null)
	const passwordInput = useRef(null)
	const loginButton = useRef(null)

	const isAllowedToLogin = () =>
		emailInput.current.value.length >= 6 && passwordInput.current.value.length >= 8

	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-4 md:p-8'>
				<form
					onInput={() => isAllowedToLogin() && setLoginPermission(true)}
					className='
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
							type={loginPermission ? 'button' : 'submit'}
							ref={loginButton}
							onClick={async () => {
								if (loginButton.current.type === 'button') {
									await handleUserConnection(
										getClientToken(emailInput.current.value, passwordInput.current.value)
									)
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
