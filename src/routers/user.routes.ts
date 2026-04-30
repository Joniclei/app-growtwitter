import { Router } from 'express'
import { userController } from '../factories/user.factory'

export const userRouter = Router()

userRouter.post('/', userController.create)
userRouter.get('/:username', userController.findByUsername)
