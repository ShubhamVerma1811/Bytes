import React from 'react'
import { createContext } from 'react'
import { User, UserSchema } from 'types/User'

export type UserContextType = {
  user: User | null
  setUser: React.SetStateAction<any | null>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})
