import { Router } from "express";
import { getUser, addUser, updateUser, deleteUser } from "../controllers/userController";

const router = Router()
router.get('/:id', getUser)
router.post('/', addUser)
router.put('/', updateUser)
router.delete('/:id', deleteUser)

export default router