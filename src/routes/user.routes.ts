import { Router } from 'express'
import { userController } from '../factories/user.factory'
import { authMiddleware } from '../middlewares/auth.middleware'

export const userRouter = Router()

userRouter.post('/', userController.create)
userRouter.get('/:username', authMiddleware, userController.findByUsername)
userRouter.post('/:id/follow', authMiddleware, userController.follow)
userRouter.delete('/:id/follow', authMiddleware, userController.unfollow)
