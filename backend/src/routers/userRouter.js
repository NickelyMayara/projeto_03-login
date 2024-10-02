import express from "express"
import { createUsers, loginUser } from "../controller/userController.js"

const router = express.Router()

router.post('/register', createUsers)
router.post('/login', loginUser)

export default router