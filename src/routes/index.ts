import { Router } from 'express'
import { userRouter } from './user.routes'
import { authRouter } from './auth.routes'
import { tweetRouter } from './tweet.routes'

export const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/tweets', tweetRouter)
