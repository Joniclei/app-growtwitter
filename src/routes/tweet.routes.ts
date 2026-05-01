import { Router } from 'express'
import { tweetController } from '../factories/tweet.factory'
import { authMiddleware } from '../middlewares/auth.middleware'

export const tweetRouter = Router()

tweetRouter.post('/', authMiddleware, tweetController.create)
tweetRouter.post('/:id/reply', authMiddleware, tweetController.reply)
tweetRouter.get('/feed', authMiddleware, tweetController.feed)
