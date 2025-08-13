import jw from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123'

export const generateToken = (payload: object) => {
  return jw.sign(payload, JWT_SECRET, {expiresIn: '1h'})
}