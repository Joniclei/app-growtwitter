import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/user.repository'
import { CreateUserDto, UserResponseDto } from '../dtos/user.dto'

export class UserService {
  constructor(private userRepository: UserRepository) {}

  create = async (data: CreateUserDto): Promise<UserResponseDto> => {
    const userExists = await this.userRepository.findByUsername(data.username)
    if (userExists) throw createError(409, 'Username já está em uso')

    const emailExists = await this.userRepository.findByEmail(data.email)
    if (emailExists) throw createError(409, 'Email já está em uso')

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    })

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    }
  }

  findByUsername = async (username: string): Promise<UserResponseDto> => {
    const user = await this.userRepository.findByUsername(username)
    if (!user) throw createError(404, 'Usuário não encontrado')

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    }
  }
}
