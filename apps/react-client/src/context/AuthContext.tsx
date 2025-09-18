import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { login as apiLogin, register as apiRegister } from "../lib/api"
import { User as TypeUser} from '../../../../packages/shared-types/User'

type AuthContextType = {
  user: TypeUser | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TypeUser | null>(null)
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    const t = localStorage.getItem('accessToken')
    if(t) {
      setToken(t)
    }
  }, [])

  async function login(email: string, password: string) {
    const { user, accessToken, refreshToken} = await apiLogin(email, password)
    setUser(user)
    setToken(accessToken)
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  async function register(email: string, password: string) {
    const { user, accessToken, refreshToken} = await apiRegister(email, password)
    setUser(user)
    setToken(accessToken)
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

 function logout() {

  }

  return (
    <AuthContext.Provider value={{user, token, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('userAuth must be used within a AuthContext provider')
  return ctx
}