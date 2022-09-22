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
	chat_id: number
	memberData: {
		firstName: string
		lastName: string
		profilePic: null | string
		userBio_id: number
		user_id: number
	}
}

export interface messageData {
	chat_id: number,
	user_id: number,
	content: string
}

export interface message {
	chat_id: number
	chat_message_id: number
	content: string
	sender_id: number
}
