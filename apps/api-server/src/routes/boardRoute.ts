import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { getUserBoards, addBoard, addBoardMembers } from '../controllers/boardController'


const router = Router()

router.get('/:userId', requireAuth, getUserBoards)
router.post('/', requireAuth, addBoard)
router.post('/:boardId/members', requireAuth, addBoardMembers)

export default router