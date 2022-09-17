export interface AuthUserBio {
	firstName: string
	lastName?: string
	profilePic?: File
}

export interface AuthUserEmail {
	email: string
	type: string
}

export interface searchUser {
	userBio_id: number
	user_id: number
	firstName: string
	lastName: string
	profilePic: string
}

export interface Me {
	user_id: number
	userBio_id: number
	email: string
	firstName: string
	lastName: string
	profilePic: string
}

export interface Chat {
	chatId: number
	memberData: {
		firstName: string
		lastName: string
		profilePic: null | string
		userBio_id: number
		user_id: number
	}
}
