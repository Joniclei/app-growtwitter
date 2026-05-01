import createError from 'http-errors'
import { TweetRepository } from '../repositories/tweet.repository'
import { FollowerRepository } from '../repositories/follower.repository'

export class TweetService {
  constructor(
    private tweetRepository: TweetRepository,
    private followerRepository: FollowerRepository
  ) {}

  create = async (data: { content: string; userId: string }) => {
    return this.tweetRepository.create(data)
  }

  reply = async (data: { content: string; userId: string; parentId: string }) => {
    const parent = await this.tweetRepository.findById(data.parentId)
    if (!parent) throw createError(404, 'Tweet não encontrado')
    if (parent.type !== 'TWEET') throw createError(422, 'Não é possível responder a um reply')

    return this.tweetRepository.createReply(data)
  }

  feed = async (userId: string) => {
    const following = await this.followerRepository.findFollowing(userId)
    const followingIds = following.map((f) => f.followingId)
    return this.tweetRepository.findFeed([userId, ...followingIds])
  }
}
