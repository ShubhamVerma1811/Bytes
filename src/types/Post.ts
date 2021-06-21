import { UserSchema } from './User'

export type PostSchema = {
  pid: string
  images: Array<string>
  slug: string
  title: string
  uid: string
  reactions: number
  __createdtime__?: string
  __updatedtime__?: string
}

export type Post = PostSchema & UserSchema
