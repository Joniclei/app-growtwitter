import { PrismaClient } from '@prisma/client'

export class TweetRepository {
  constructor(private prisma: PrismaClient) {}

  create = async (data: { content: string; userId: string }) => {
    return this.prisma.tweet.create({
      data: { ...data, type: 'TWEET' },
    })
  }

  createReply = async (data: { content: string; userId: string; parentId: string }) => {
    return this.prisma.tweet.create({
      data: { ...data, type: 'REPLY' },
    })
  }

  findById = async (id: string) => {
    return this.prisma.tweet.findUnique({ where: { id } })
  }

  findFeed = async (userIds: string[]) => {
    return this.prisma.tweet.findMany({
      where: { userId: { in: userIds }, type: 'TWEET' },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true, username: true, avatarUrl: true } } },
    })
  }
}
