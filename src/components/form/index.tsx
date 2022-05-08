import { LegacyRef } from 'react'

interface BasicInputProps {
	inputId: string,
	reference: LegacyRef<HTMLInputElement> | undefined | null,
	optional?: boolean,
	label?: string,
	[rest:string]: unknown
}

interface InputProps extends BasicInputProps {
	type?: 'text' | 'email' | 'password',
}

const Input = ({ inputId, reference, type = 'text', label = '', optional = false, ...rest }: InputProps) => (
	<div>
		<label htmlFor={inputId} className='inline-block px-4 py-2 cursor-pointer'>
			{label}
		</label>
		<input
			className='block w-full px-4 py-3 border border-gray-300 rounded-md'
			required={!optional}
			type={type}
			id={inputId}
			ref={reference}
			{...rest}
		/>
	</div>
)

interface CheckboxProps extends BasicInputProps {
	title: string,
	type?: 'checkbox'
}

const Checkbox = ({ inputId, reference = '', label = '', title = '', type = 'checkbox', ...rest }: CheckboxProps) => (
	<div title={title}>
		<input
			type={type || 'checkbox'}
			id={inputId}
			className='w-max mr-2 cursor-pointer'
			ref={reference}
			{...rest}
		/>
		<label htmlFor={inputId} className='cursor-pointer'>
			{label}
		</label>
	</div>
)

export const Form = {
	Input,
	Checkbox,
}
