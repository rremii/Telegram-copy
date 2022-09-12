export interface DefaultResponse {
	message: string
}

export interface TokenResponse {
	accessToken: string
}

export interface ErrorResponse {
	error: string
	errors: [string]
}

