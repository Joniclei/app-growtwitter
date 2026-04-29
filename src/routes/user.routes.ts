import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const userController = new UserController()

export const userRouter = Router()

userRouter.post('/', userController.create)
userRouter.get('/:username', authMiddleware, userController.findByUsername)
userRouter.post('/:id/follow', authMiddleware, userController.follow)
userRouter.delete('/:id/follow', authMiddleware, userController.unfollow)
