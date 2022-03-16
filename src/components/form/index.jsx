const Input = ({  inputId, inputRef='', type='', placeholder = '', ...rest }) => {
	rest.optional || (rest.required = 'required')

	if (!inputId) {
		throw new Error('<Form.Input /> needs an inputId')
	}

	rest.id = inputId
	type && (rest.type = type)
	inputRef && (rest.ref = inputRef)

	return (
		<div>
			<label htmlFor={inputId} className='inline-block px-4 py-2 cursor-pointer'>
				{placeholder}
			</label>
			<input
				placeholder={placeholder}
				className='block w-full p-4 border border-gray-300 rounded-md'
				{...rest}
			/>
		</div>
	)
}

export const Form = {
	Input,
}
