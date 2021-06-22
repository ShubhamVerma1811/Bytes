import React, { createContext } from 'react'
import { User } from 'types/User'

export type UserContextType = {
  user: User | null
  setUser: React.SetStateAction<any | null>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})
