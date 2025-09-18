import { Router } from "express";
import { register, login } from "../controllers/authController";
import { refresh, logout } from "../controllers/tokenController";

const router = Router()

router.post('/register', register )
router.post('/login', login)
router.post('/refresh-token', refresh)
router.post('/logout', logout)

export default router