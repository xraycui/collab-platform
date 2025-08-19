import React, { createContext, ReactNode } from "react"

type AuthContextType = {

}

const AuthContext = createContext<AuthContextType | null>({})

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {

}