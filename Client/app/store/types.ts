export interface AuthUserBio {
	firstName: string
	lastName?: string
	profilePic?: File
}

export interface AuthUserEmail {
	email: string
	type: string
}

//TODO gotta fix types cuc most of em are same

export interface userInfo extends Me {
	lastOnline: Date | null
}

export interface Me {
	user_id: number
	userBio_id: number
	email: string
	firstName: string
	lastName: null | string
	profilePic: null | string
}

export interface Chat {
	chat_id: number
	memberInfo: userInfo
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
