import { PrismaClient } from '@prisma/client'

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  create = async (data: {
    name: string
    username: string
    email: string
    password: string
    avatarUrl?: string
  }) => {
    return this.prisma.user.create({ data })
  }

  findByUsername = async (username: string) => {
    return this.prisma.user.findUnique({ where: { username } })
  }

  findByEmail = async (email: string) => {
    return this.prisma.user.findUnique({ where: { email } })
  }
}
