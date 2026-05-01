import { PrismaClient } from '@prisma/client'

export class LikeRepository {
  constructor(private prisma: PrismaClient) {}

  create = async (data: { userId: string; tweetId: string }) => {
    return this.prisma.like.create({ data })
  }

  delete = async (data: { userId: string; tweetId: string }) => {
    return this.prisma.like.delete({
      where: { userId_tweetId: data },
    })
  }
}
