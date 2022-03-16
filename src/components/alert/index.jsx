const Error = ({ isHidden, message }) => {
	return (
		<div
			className={`${isHidden ? 'hidden' : ''} p-4 rounded-md text-red-600 font-semibold bg-red-300`}
		>
			{message}
		</div>
	)
}

export const Alert = {
	Error
}