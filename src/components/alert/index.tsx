// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Error = ({ isHidden, message }: any) => (
	<div className={`${isHidden ? 'hidden' : ''} p-4 rounded-md text-red-600 font-semibold bg-red-300`}>
		{message}
	</div>
)

export const Alert = {
	Error,
}
