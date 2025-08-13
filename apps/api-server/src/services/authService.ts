import db from '../db/connection'
import bcrypt from 'bcrypt'

export const registerUser = async (email: string, password: string) => {
  const existing = await db('users').where({email}).first()
  if(existing) throw new Error('Email aleady in use')
  
  const hashed = await bcrypt.hash(password, 10)
  const [user] = await db('users').insert({email, password: hashed}).returning(['id', 'email'])

  return user
}

export const loginUser = async (email: string, password: string) => {
  const user = await db('users').where({email}).first()
  if(!user) throw new Error('Invalid email')
  
  const match = await bcrypt.compare(password, user.password)
  if(!match) throw new Error('Wrong password')
  
  return {id: user.id, email: user.email}
}