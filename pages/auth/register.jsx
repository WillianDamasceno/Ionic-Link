import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

import { Form, Alert } from '../../src/components'
import { isValidDomainName } from '../../src/utils/validations'

const Register = () => {
	const publicUrlBase = 'ioniclink.com/'

	const [connectionWorked, setConnectionWorked] = useState(true)

	// Redirect if the authToken in the storage is valid
	const registerUser = async (email, password, domainOrBrandName) => (
		await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				publicUrlName: domainOrBrandName,
			}),
		})
	).json()

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

	const saveUserInfo = (authToken) => {
		localStorage.setItem('authToken', authToken)
	}

	const keepUserConnected = (userConnectionResponde) => {
		console.log(userConnectionResponde)

		saveUserInfo(userConnectionResponde.authToken)
	}

	const handleUserRegistration = async (userRegistrationAttempt) => {
		setConnectionWorked(true)

		const userRegistrationStatus = await userRegistrationAttempt
		const registrationResponse = userRegistrationStatus.response

		if (userRegistrationStatus.success) {
			keepUserConnected(registrationResponse)
			window.location = '/admin'
		} else {
			setConnectionWorked(false)
		}
	}

	const [publicUrl, setPublicUrl] = useState(publicUrlBase)
	const [hasValidPublicUrl, setHasValidPublicUrl] = useState(true)

	const renderInvalidDomainOrBrandNameError = () => {
		setHasValidPublicUrl(false)
	}

	const getPublicUrl = (baseUrl, domainOrBrandName) => {
		if (isValidDomainName(domainOrBrandName)) {
			setHasValidPublicUrl(true)
			setPublicUrl(`${baseUrl}${domainOrBrandName.toLowerCase().replaceAll(' ', '-')}`)
		} else {
			renderInvalidDomainOrBrandNameError()
		}
	}

	const [isConfirmedPassword, setIsConfirmedPassword] = useState(true)

	const emailInput = useRef(null)
	const passwordInput = useRef(null)
	const domainOrBrandNameInput = useRef(null)

	const checkPasswords = ({ target }) => {
		const { value: password } = passwordInput.current
		const { value: passwordConfirmation } = target

		if (password === passwordConfirmation || !passwordConfirmation) {
			setIsConfirmedPassword(true)
		} else {
			setIsConfirmedPassword(false)
		}
	}

	const registerButton = useRef(null)
	const [isAllowedToRegister, setIsAllowedToRegister] = useState(false)

	useEffect(() => {
		const registerForm = document.querySelector('.register-form')
		const everyFormField = [...registerForm.querySelectorAll('input')]

		registerForm.addEventListener('input', () => {
			const { length: passwordLength } = passwordInput.current.value

			if (passwordLength >= 8 && everyFormField.every((field) => field.value)) {
				setIsAllowedToRegister(true)
			} else {
				setIsAllowedToRegister(false)
			}
		})
	}, [])

	return (
		<>
			<Head>
				<title>Ionic Link</title>
			</Head>

			<main className='grid place-items-center min-h-screen p-4 md:p-8'>
				<form
					className='
						register-form grid gap-4 w-full max-w-4xl h-max p-8 md:p-12 rounded-3xl bg-white shadow-lg
					'
				>
					<h1 className='text-4xl'>Sign Up</h1>

					<div className='grid md:grid-cols-2 gap-4'>
						<Form.Input
							inputId='email'
							placeholder='E-mail'
							inputRef={emailInput}
							autoFocus
						/>

						<Form.Input
							type='password'
							minLength='8'
							inputId='password'
							placeholder='Password'
							inputRef={passwordInput}
						/>

						<Form.Input
							type='password'
							minLength='8'
							inputId='password-confirmation'
							placeholder='Confirm your Password'
							onBlur={checkPasswords}
						/>
					</div>

					<Alert.Error isHidden={isConfirmedPassword} message='The passwords do not match' />

					<div className='grid md:grid-cols-2 gap-4'>
						<Form.Input
							inputId='domain-name'
							placeholder='Domain or Brand Name'
							inputRef={domainOrBrandNameInput}
							onInput={({ target }) => getPublicUrl(publicUrlBase, target.value)}
						/>

						<div>
							<span
								htmlFor='register-output-public-url-name'
								className='inline-block px-4 py-2'
							>
								This will be your Public URL
							</span>
							<output
								id='register-output-public-url-name'
								className='block w-full p-4 border border-gray-300 rounded-md overflow-x-hidden'
							>
								{publicUrl}
							</output>
						</div>
					</div>

					<Alert.Error isHidden={hasValidPublicUrl} message='Invalid Domain or Brand Name' />

					<div className='flex gap-2'>
						<button
							type={isAllowedToRegister ? 'button' : 'submit'}
							ref={registerButton}
							onClick={async () => {
								const { value: email } = emailInput.current
								const { value: password } = passwordInput.current
								const { value: domainOrBrandName } = domainOrBrandNameInput.current

								if (registerButton.current.type === 'button') {
									await handleUserRegistration(registerUser(email, password, domainOrBrandName))
								}
							}}
							className='
								w-max py-4 px-6 md:px-8 rounded-md
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
									w-fit py-4 px-3 md:px-4 rounded-md
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
