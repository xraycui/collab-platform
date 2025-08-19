import React, {useState, useEffect, FormEvent} from  "react"

export default function LoginForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try{
     
    } catch (error: any) {
      setError(error?.message || 'Failed')
    } finally {
      setLoading(false)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <div className="space" />
      <label htmlFor="email">Email</label>
      <input className="input" id="email" value={email} onChange={(e)=> {setEmail(e.target.value)}} />
      <label htmlFor="password">Password</label>
      <input className="input" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <div style={{color: 'red'}}>{error}</div>}
      <div className="space"></div>
      <div className="row" style={{ justifyContent: 'space-between'}}>
        <button className="button" disabled={loading} type="submit">{loading ? '...' : (mode === 'login' ? 'Login On' : 'Create Account')}</button>
        <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Need an account?' : 'Have an account?'}</button>
      </div>
    </form>
  )
}