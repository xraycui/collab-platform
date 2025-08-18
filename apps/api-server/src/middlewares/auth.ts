import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string
export function requireAuth (req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization
    if(!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Missing Authorization header"})
    }

    const token = header.split(' ')[1]
    const payload = jwt.verify(token, JWT_SECRET) as {id: number, email: string}
    req.user = { id: payload.id, email: payload.email }

    next()
  } catch (err: any) {
    res.status(401).json({error: err.message})
  }
}