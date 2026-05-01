import { PrismaClient } from '@prisma/client'
import { TweetRepository } from '../repositories/tweet.repository'
import { LikeRepository } from '../repositories/like.repository'
import { TweetService } from '../services/tweet.service'
import { TweetController } from '../controllers/tweet.controller'

const prisma = new PrismaClient()
const tweetRepository = new TweetRepository(prisma)
const likeRepository = new LikeRepository(prisma)
const tweetService = new TweetService(tweetRepository, likeRepository)
export const tweetController = new TweetController(tweetService)
