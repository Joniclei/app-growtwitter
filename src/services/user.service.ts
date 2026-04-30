import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/user.repository'

export class UserService {
  constructor(private userRepository: UserRepository) {}

  create = async (data: {
    name: string
    username: string
    email: string
    password: string
    avatarUrl?: string
  }) => {
    const userExists = await this.userRepository.findByUsername(data.username)
    if (userExists) throw createError(409, 'Username já está em uso')

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    })

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  findByUsername = async (username: string) => {
    const user = await this.userRepository.findByUsername(username)
    if (!user) throw createError(404, 'Usuário não encontrado')

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}
