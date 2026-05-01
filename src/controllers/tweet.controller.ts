import { Request, Response } from 'express'
import { TweetService } from '../services/tweet.service'

export class TweetController {
  constructor(private tweetService: TweetService) {}

  create = async (req: Request, res: Response) => {
    const { content } = req.body
    const userId = req.user.id
    const tweet = await this.tweetService.create({ content, userId })
    return res.status(201).json(tweet)
  }

  reply = async (req: Request, res: Response) => {
    const { content } = req.body
    const userId = req.user.id
    const parentId = req.params.id as string
    const tweet = await this.tweetService.reply({ content, userId, parentId })
    return res.status(201).json(tweet)
  }

  feed = async (req: Request, res: Response) => {
    const userId = req.user.id
    const tweets = await this.tweetService.feed(userId)
    return res.status(200).json(tweets)
  }
}
