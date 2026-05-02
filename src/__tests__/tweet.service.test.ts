import { TweetService } from '../services/tweet.service'
import { TweetRepository } from '../repositories/tweet.repository'
import { LikeRepository } from '../repositories/like.repository'

const mockTweetRepository = {
  create: jest.fn(),
  createReply: jest.fn(),
  findById: jest.fn(),
  findFeed: jest.fn(),
} as unknown as TweetRepository

const mockLikeRepository = {
  create: jest.fn(),
  delete: jest.fn(),
} as unknown as LikeRepository

const tweetService = new TweetService(mockTweetRepository, mockLikeRepository)

describe('TweetService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('reply', () => {
    it('deve lançar erro 404 se tweet pai não existir', async () => {
      ;(mockTweetRepository.findById as jest.Mock).mockResolvedValue(null)

      await expect(
        tweetService.reply({ content: 'reply', userId: 'user-1', parentId: 'tweet-1' })
      ).rejects.toMatchObject({ status: 404, message: 'Tweet não encontrado' })
    })

    it('deve lançar erro 422 se tentar responder um reply', async () => {
      ;(mockTweetRepository.findById as jest.Mock).mockResolvedValue({ id: 'tweet-1', type: 'REPLY' })

      await expect(
        tweetService.reply({ content: 'reply', userId: 'user-1', parentId: 'tweet-1' })
      ).rejects.toMatchObject({ status: 422, message: 'Não é possível responder a um reply' })
    })
  })

  describe('like', () => {
    it('deve lançar erro 404 se tweet não existir', async () => {
      ;(mockTweetRepository.findById as jest.Mock).mockResolvedValue(null)

      await expect(
        tweetService.like({ userId: 'user-1', tweetId: 'tweet-1' })
      ).rejects.toMatchObject({ status: 404, message: 'Tweet não encontrado' })
    })
  })
})
