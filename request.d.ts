/// <reference types="mithril" />
import { RequestOptions as MithrilRequestOptions } from 'mithril';
export interface RequestOptions<T> extends MithrilRequestOptions<T> {
    url: string;
}
export interface DataResponse<T> {
    errorCode: undefined;
    xhr: XMLHttpRequest;
    data: T;
}
export interface ErrorResponse<E> {
    errorCode: number;
    xhr: XMLHttpRequest;
    error: E;
}
export declare type Response<T, E> = DataResponse<T> | ErrorResponse<E>;
/**
 * Mithril request wrapper that doesn't throw on error status codes.
 * Errors are thrown only on parse errors or network errors.
 */
export default function request<T, E = any>(options: RequestOptions<T>): Promise<Response<T, E>>;
