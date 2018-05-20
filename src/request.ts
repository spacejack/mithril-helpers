import {request as mithrilRequest, RequestOptions as MithrilRequestOptions} from 'mithril'

export interface RequestOptions<T> extends MithrilRequestOptions<T> {
	url: string
}

export interface DataResponse<T> {
	errorCode: undefined
	xhr: XMLHttpRequest
	data: T
}

export interface ErrorResponse<E> {
	errorCode: number
	xhr: XMLHttpRequest
	error: E
}

export type Response<T, E> = DataResponse<T> | ErrorResponse<E>

/**
 * Mithril request wrapper that doesn't throw on error status codes.
 * Errors are thrown only on parse errors or network errors.
 */
export default function request<T, E = any> (options: RequestOptions<T>): Promise<Response<T, E>> {
	let xhr: XMLHttpRequest

	function extract (x: XMLHttpRequest): T {
		xhr = x
		const text = xhr.responseText
		let data: any
		if (options.extract) {
			data = options.extract(xhr, options)
		} else {
			if (options.deserialize) {
				data = options.deserialize(text)
			} else {
				try {
					data = text !== '' ? JSON.parse(text) : null
				} catch (err) {
					throw new Error(text)
				}
			}
		}
		if (xhr.status >= 400 || xhr.status < 200) {
			const err: Error & {httpStatus: number; data: any} = new Error('HTTP error code') as any
			err.httpStatus = xhr.status
			err.data = data
			// When mithril encounters these error codes it will *always* throw.
			// We pre-empt that throw here so we can recognize our own error object.
			throw err
		}
		return data
	}

	return mithrilRequest<T>({...options, extract}).then(
		result => ({
			errorCode: undefined, xhr, data: result
		} as DataResponse<T>)
	).catch(err => {
		if (err.httpStatus == null) {
			// Actual error - re-throw
			throw err
		}
		// Check for status = 0 when doing file:// requests
		return (err.httpStatus === 0 && err.data)
			? { // Consider this a successful load from filesystem
				errorCode: undefined, xhr, data: err.data
			} as DataResponse<T>
			: { // Now we can assume an HTTP status error. Return the data in an error property.
				errorCode: err.httpStatus as number, xhr, error: err.data as E
			} as ErrorResponse<E>
	})
}
