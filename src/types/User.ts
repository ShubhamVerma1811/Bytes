export type UserSchema = {
  uid: string
  email: string
  name: string
  username: string
  verified: boolean
  __createdtime__?: string
  __updatedtime__?: string
}

export type User = UserSchema & {
  isLoggedIn: boolean
}

export type PostAuthor = Omit<UserSchema, 'uid' | 'email' | 'verified'>
