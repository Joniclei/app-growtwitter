import { PrismaClient } from '@prisma/client'

export class FollowerRepository {
  constructor(private prisma: PrismaClient) {}

  findFollowing = async (userId: string) => {
    return this.prisma.follower.findMany({ where: { followerId: userId } })
  }

  create = async (data: { followerId: string; followingId: string }) => {
    return this.prisma.follower.create({ data })
  }

  delete = async (data: { followerId: string; followingId: string }) => {
    return this.prisma.follower.delete({
      where: { followerId_followingId: data },
    })
  }
}
