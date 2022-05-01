import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState, useRef } from 'react'

import { Form, Alert } from '../../src/components'
import { saveUserInfo, getSavedUserInfo } from '../../src/utils/auth'
import { getClientToken } from '../../src/graphql/client'

const Login = () => {
	useEffect(() => {
		const { authToken, stayConnected } = getSavedUserInfo() || {}

		if (authToken) {
			Router.push('/admin')
		}
	})

	const stayConnected = useRef<HTMLInputElement>(null)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const keepUserConnected = (userConnectionResponde: any) => {
		if (stayConnected.current) {
			saveUserInfo({
				authToken: userConnectionResponde.authToken,
				stayConnected: stayConnected.current?.checked
			})
		}
	}

	const [connectionWorked, setConnectionWorked] = useState(true)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleUserConnection = async (userConnectionAttempt: any) => {
		setConnectionWorked(true)

		const userConnectionStatus = await userConnectionAttempt
		const connectionResponse = userConnectionStatus.response

		if (userConnectionStatus.success) {
			keepUserConnected(connectionResponse)
			Router.push('/admin')
			return
		}

		setConnectionWorked(false)
	}

	const [loginPermission, setLoginPermission] = useState(false)
	const emailInput = useRef<HTMLInputElement>(null)
	const passwordInput = useRef<HTMLInputElement>(null)
	const loginButton = useRef<HTMLButtonElement>(null)

	// eslint-disable-next-line consistent-return
	const isAllowedToLogin = () => {
		if (emailInput.current && passwordInput.current) {
			return emailInput.current?.value.length >= 6 && passwordInput.current?.value.length >= 8
		}
	}

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

					<Form.Checkbox
						inputId='stay-connected'
						inputRef={stayConnected}
						label='Stay connected'
						title='Click to Login Automatically'
					/>

					<div className='flex gap-2'>
						<button
							type={loginPermission ? 'button' : 'submit'}
							ref={loginButton}
							onClick={async () => {
								if (loginButton.current?.type === 'button' && emailInput.current && passwordInput.current) {
									await handleUserConnection(
										getClientToken(emailInput.current?.value, passwordInput.current?.value),
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
