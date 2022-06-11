type StorageType = 'session' | 'local'

type UseStorageReturnValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItem: (key: string, type: StorageType) => any
  setItem: (key: string, type: StorageType, value: string) => boolean
	removeItem: (key: string, type: StorageType) => void
}

export const useStorage = (): UseStorageReturnValue => {
	const emptyJsonString = JSON.stringify('')
	const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()

	const storageType = (type: StorageType): 'localStorage' | 'sessionStorage' => `${type}Storage`

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getItem = (key: string, type: StorageType): any => {
		if (isBrowser) {
			return JSON.parse(window[storageType(type)][key] || emptyJsonString)
		}

		return ''
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const setItem = (key: string, type: StorageType, value: any): boolean => {
		if (isBrowser) {
			window[storageType(type)].setItem(key, JSON.stringify(value || ''))
		}

		return isBrowser
	}

	const removeItem = (key: string, type: StorageType): boolean => {
		if (isBrowser) {
			window[storageType(type)].removeItem(key);
		}

		return isBrowser
	}

	return {
		getItem,
		setItem,
		removeItem
	}
}
