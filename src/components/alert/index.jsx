export const Alert = {
	Error: ({ isHidden, message }) => {
		return (
			<div
				className={`${isHidden ? 'hidden' : ''} p-4 rounded-md text-red-700 font-semibold bg-red-400`}
			>
				{message}
			</div>
		)
	}
}

// const AlertError = ({ isHidden, message }) => {
// 	return (
// 		<div
// 			className={`${isHidden ? 'hidden' : ''} p-4 rounded-md text-red-700 font-semibold bg-red-400`}
// 		>
// 			{message}
// 		</div>
// 	)
// }
