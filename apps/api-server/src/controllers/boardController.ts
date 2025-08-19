import { Request, Response, NextFunction } from "express";
import boardService from '../services/boardService'

export async function getUserBoards(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params
    const boards = await boardService.getBoards(userId)
    res.status(201).json({ boards})
  } catch (err: any) {
    res.status(500).json({error: err.message})
  }
}

export async function addBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body
    const board = await boardService.addBoard()
    res.status(201).json({board})
  } catch (err: any) {
    res.status(500).json({error: err.message})
  }
}

export async function updateBoard(req: Request, res: Response, next: NextFunction) {
  try {

  } catch (err: any) {
    res.status(500).json({error: err.message})
  }
}

export async function deleteBoard(req: Request, res: Response, next: NextFunction) {
  try {

  } catch (err: any) {
    res.status(500).json({error: err.message})
  }
}

export async function addBoardMembers(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId } = req.params
    const { userId } = req.body as {userId: string}
    await boardService.addBoardMembers(boardId, userId)
  } catch (err: any) {
    res.status(500).json({error: err.message})
  }
}