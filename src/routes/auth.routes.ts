import { Router } from 'express'
import { authController } from '../factories/auth.factory'
import { validate } from '../middlewares/validate.middleware'
import { loginSchema } from '../dtos/user.dto'

export const authRouter = Router()

authRouter.post('/login', validate(loginSchema), authController.login)
