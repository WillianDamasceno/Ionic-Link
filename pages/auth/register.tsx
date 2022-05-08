import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { useState, useRef, useEffect } from 'react'

import { Form, Alert } from '../../src/components'
import { getSavedUserInfo } from '../../src/utils/auth'
import { isValidDomainName } from '../../src/utils/validations'

const Register = () => {
	const domain = 'ioniclink.com/'

	// Redirect if the authToken in the storage is valid
	const registerUser = async (email: string, password: string, username: string) => (
		await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				username,
			}),
		})
	).json()

	useEffect(() => {
		const { authToken } = getSavedUserInfo() || {}

		if (authToken) {
			Router.push('/admin')
		}
	})

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleUserRegistration = async (userRegistrationAttempt: any) => {
		const userRegistrationStatus = await userRegistrationAttempt

		if (userRegistrationStatus?.success) {
			Router.push('/auth/login')
		}
	}

	const [publicUrl, setPublicUrl] = useState(domain)
	const [hasValidPublicUrl, setHasValidPublicUrl] = useState(true)

	const renderInvalidDomainOrBrandNameError = () => {
		setHasValidPublicUrl(false)
	}

	const getPublicUrl = (baseUrl: string, domainOrBrandName: string) => {
		if (isValidDomainName(domainOrBrandName)) {
			setHasValidPublicUrl(true)
			setPublicUrl(`${baseUrl}${domainOrBrandName.toLowerCase().replaceAll(' ', '-')}`)
		} else {
			renderInvalidDomainOrBrandNameError()
		}
	}

	const emailInput = useRef(null)
	const passwordInput = useRef(null)
	const domainOrBrandNameInput = useRef(null)

	const registerButton = useRef<HTMLButtonElement>(null)
	const [isAllowedToRegister, setIsAllowedToRegister] = useState(false)

	useEffect(() => {
		const registerForm = document.querySelector('.register-form')
		const everyFormField = [...(registerForm?.querySelectorAll('input') || [])]

		registerForm?.addEventListener('input', () => {
			const { value: { length: passwordLength } } = passwordInput.current || { value: '' }

			setIsAllowedToRegister(passwordLength >= 8 && everyFormField.every((field) => field.value))
		})
	}, [])

	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center p-4 md:p-8'>
				<form
					className='
						register-form grid gap-4 w-full max-w-2xl h-max p-8 md:p-12 rounded-3xl bg-white shadow-lg
					'
				>
					<h1 className='text-4xl'>Sign Up</h1>

					<div className=''>
						<Form.Input
							type='email'
							inputId='email'
							label='E-mail'
							reference={emailInput}
							autoFocus
						/>

						<Form.Input
							type='password'
							minLength='8'
							inputId='password'
							label='Password'
							reference={passwordInput}
						/>
					</div>

					<div className=''>
						<Form.Input
							inputId='domain-name'
							label='Username'
							reference={domainOrBrandNameInput}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							onInput={({ target }: any) => getPublicUrl(domain, target.value)}
						/>

						<div>
							<span className='inline-block px-4 py-2'>
								This will be your Public URL
							</span>
							<output
								id='register-output-public-url-name'
								className='block w-full px-4 py-3 border border-gray-300 rounded-md overflow-x-hidden'
							>
								{publicUrl}
							</output>
						</div>
					</div>

					<Alert.Error isHidden={hasValidPublicUrl} message='Username already taken' />

					<div className='flex gap-2'>
						<button
							type={isAllowedToRegister ? 'button' : 'submit'}
							ref={registerButton}
							onClick={async () => {
								const { value: email } = emailInput.current || { value: '' }
								const { value: password } = passwordInput.current || { value: '' }
								const { value: domainOrBrandName } = domainOrBrandNameInput.current || { value: '' }

								if (registerButton.current?.type === 'button') {
									await handleUserRegistration(registerUser(email, password, domainOrBrandName))
								}
							}}
							className='
								w-max py-3 px-6 md:px-8 rounded-md
								text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-600
								outline-offset-2 accent-slate-400 transition
							'
						>
							Register
						</button>

						<Link href='/auth/login'>
							<button
								type='button'
								className='
									w-fit px-3 md:px-4 rounded-md
									text-purple-800 hover:text-white active:text-white hover:bg-gray-500
									outline-offset-2 active:bg-gray-600 transition
								'
							>
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
