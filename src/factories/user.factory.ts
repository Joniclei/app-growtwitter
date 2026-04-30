import { PrismaClient } from '@prisma/client'
import { UserRepository } from '../repositories/user.repository'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'

const prisma = new PrismaClient()
const userRepository = new UserRepository(prisma)
const userService = new UserService(userRepository)
export const userController = new UserController(userService)
