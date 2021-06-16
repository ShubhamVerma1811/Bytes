import React from 'react'
import { createContext } from 'react'

export type UserContextType = {
  user: any | null
  setUser: React.SetStateAction<any | null>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})
