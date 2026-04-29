import { Router } from 'express'
import { TweetController } from '../controllers/tweet.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const tweetController = new TweetController()

export const tweetRouter = Router()

tweetRouter.post('/', authMiddleware, tweetController.create)
tweetRouter.post('/:id/reply', authMiddleware, tweetController.reply)
tweetRouter.get('/feed', authMiddleware, tweetController.feed)
tweetRouter.post('/:id/like', authMiddleware, tweetController.like)
tweetRouter.delete('/:id/like', authMiddleware, tweetController.unlike)
