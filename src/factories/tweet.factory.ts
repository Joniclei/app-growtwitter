import { PrismaClient } from '@prisma/client'
import { TweetRepository } from '../repositories/tweet.repository'
import { TweetService } from '../services/tweet.service'
import { TweetController } from '../controllers/tweet.controller'

const prisma = new PrismaClient()
const tweetRepository = new TweetRepository(prisma)
const tweetService = new TweetService(tweetRepository)
export const tweetController = new TweetController(tweetService)
