import React, { createContext, ReactNode} from "react";

type Notification = {
  type: string
  message?: string
  boardId?: string
  by?: number
}
type Ctx = { 
  notification: Notification[]
}

const NotificationContext = createContext<Ctx | null>(null)

export function NotificationProvider({children}: {children: ReactNode}) {

  return (
    <NotificationContext.Provider value={null}>
      {children}
    </NotificationContext.Provider>
  )

}