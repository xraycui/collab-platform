import React, {useState, useEffect, FormEvent} from  "react"
import { useAuth } from "../context/AuthContext"
import './LoginForm.css'

export default function LoginForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { login, register } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try{
      mode === 'login' ? await login(email, password) : await register(email, password) 
    } catch (error: any) {
      setError(error?.message || 'Failed')
    } finally {
      setLoading(false)
    }

  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <label htmlFor="email">Email:</label>
      <input className="input" id="email" value={email} onChange={(e)=> {setEmail(e.target.value)}} />
      <label htmlFor="password">Password</label>
      <input className="input" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="button-group" style={{ justifyContent: 'space-between'}}>
        <button className="button" disabled={loading} type="submit">{loading ? '...' : (mode === 'login' ? 'Log On' : 'New Account')}</button>
        <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Register' : 'Existing User'}</button>
      </div>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </form>
  )
}