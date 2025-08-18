import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";

export async function getUser (req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const user = userService.getUser(id)
    if(!user) return res.status(404).json({error: "User not found"})
    return res.status(200).json({ user })
  } catch (err: any) {
    return res.status(500).json({error: err.message})
  }
}

export async function addUser (req: Request, res: Response, next: NextFunction) {
  try {
    await userService.addUser()
  } catch (err: any) {
    return res.status(500).json({error: err.message})
  }
}

export async function updateUser (req: Request, res: Response, next: NextFunction) {
  try {

    await userService.updateUser()
  } catch (err: any) {
    return res.status(500).json({error: err.message})
  }
}

export async function deleteUser (req: Request, res: Response, next: NextFunction) {
  try {
    await userService.deleteUser()
  } catch (err: any) {
   return res.status(500).json({error: err.message})
  }
}