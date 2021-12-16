import { ApiError } from "./ApiError";

export type ApiResponse<T> = {
    data?: T
    error?: ApiError
}