import React from 'react'
import { createContext } from 'react'
import { UserType } from 'types/User'

export type UserContextType = {
  user: UserType | null
  setUser: React.SetStateAction<any | null>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})
