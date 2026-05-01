import { Router } from 'express'
import { userRouter } from './user.routes'
import { authRouter } from './auth.routes'

export const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
