export interface AuthUserBio {
  firstName: string
  lastName?: string
  profilePic?: File
}

export interface AuthUserEmail {
  email: string
  type: string
}
