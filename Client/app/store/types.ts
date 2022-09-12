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
	firstName: string
	lastName: string
	profilePic: string
}
