// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const to = (promise: Promise<any>) =>
	promise.then((response) => [null, response]).catch((error) => [error])
