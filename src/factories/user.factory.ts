import { PrismaClient } from '@prisma/client'
import { UserRepository } from '../repositories/user.repository'
import { FollowerRepository } from '../repositories/follower.repository'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'

const prisma = new PrismaClient()
const userRepository = new UserRepository(prisma)
const followerRepository = new FollowerRepository(prisma)
const userService = new UserService(userRepository, followerRepository)
export const userController = new UserController(userService)
