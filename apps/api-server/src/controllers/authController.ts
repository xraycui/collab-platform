import { NextFunction, Request, Response } from "express"
import authService from '../services/authService'
import { signAccessToken} from '../utils/jwt'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body
        const user = await authService.registerUser(email, password)
        const token = signAccessToken(user)
        res.status(201).json({user, token})
    } catch (err: any) {
        res.status(400).json({error: err.message})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await authService.loginUser(email, password)
        const token = signAccessToken(user)
        res.status(200).json({user, token})
    } catch (err: any) {
        res.status(401).json({error: err.message})
    }
}