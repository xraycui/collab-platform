import { Request, Response } from "express"
import { registerUser, loginUser} from '../services/authService'
import { generateToken} from '../utils/jwt'

export const register = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await registerUser(email, password)
        const token = generateToken(user)
        res.status(201).json({user, token})
    } catch (err: any) {
        res.status(400).json({error: err.message})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await loginUser(email, password)
        const token = generateToken(user)
        res.status(200).json({user, token})
    } catch (err: any) {
        res.status(401).json({error: err.message})
    }
}