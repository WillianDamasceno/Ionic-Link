/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input = ({ inputId, inputRef = '', type = '', label = '', ...rest }: any) => {
	if (!rest.optional) {
		rest.required = 'required'
	}

	if (!inputId) {
		throw new Error('<Form.Input /> needs an inputId')
	}

	rest.id = inputId

	if (type) {
		rest.type = type
	}

	if (inputRef) {
		rest.ref = inputRef
	}

	return (
		<div>
			<label htmlFor={inputId} className='inline-block px-4 py-2 cursor-pointer'>
				{label}
			</label>
			<input
				className='block w-full p-4 border border-gray-300 rounded-md'
				{...rest}
			/>
		</div>
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Checkbox = ({ inputId, inputRef = '', label = '', title = '', ...rest }: any) => {
	if (!inputId) {
		throw new Error('<Form.Input /> needs an inputId')
	}

	rest.id = inputId

	if (inputRef) {
		rest.ref = inputRef
	}

	return (
		<div title={title}>
			<input
				type='checkbox'
				id={inputId}
				className='w-max mr-2 cursor-pointer'
				{...rest}
			/>
			<label htmlFor={inputId} className='cursor-pointer'>
				{label}
			</label>
		</div>
	)
}

export const Form = {
	Input,
	Checkbox,
}
