import { PrismaClient } from '@prisma/client'
import { UserRepository } from '../repositories/user.repository'
import { AuthService } from '../services/auth.service'
import { AuthController } from '../controllers/auth.controller'

const prisma = new PrismaClient()
const userRepository = new UserRepository(prisma)
const authService = new AuthService(userRepository)
export const authController = new AuthController(authService)
