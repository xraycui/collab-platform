import axios from 'axios'
import { User as TypeUser} from '../../../../packages/shared-types/User'

export const api = axios.create({baseURL: process.env.REACT_APP_API_URL})

export type LoginResponse = {
  user: TypeUser
  accessToken: string
  refreshToken: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post("/api/auth/login", { email, password })
  return data
}

export async function register(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post("/api/auth/register", { email, password })
  return data
}
