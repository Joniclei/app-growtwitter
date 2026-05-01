import { Router } from 'express'
import { authController } from '../factories/auth.factory'

export const authRouter = Router()

authRouter.post('/login', authController.login)
