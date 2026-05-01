import { Router } from 'express'
import { tweetController } from '../factories/tweet.factory'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { createTweetSchema } from '../dtos/tweet.dto'

export const tweetRouter = Router()

tweetRouter.post('/', authMiddleware, validate(createTweetSchema), tweetController.create)
tweetRouter.post('/:id/reply', authMiddleware, validate(createTweetSchema), tweetController.reply)
tweetRouter.get('/feed', authMiddleware, tweetController.feed)
tweetRouter.post('/:id/like', authMiddleware, tweetController.like)
tweetRouter.delete('/:id/like', authMiddleware, tweetController.unlike)
