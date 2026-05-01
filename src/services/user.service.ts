import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/user.repository'
import { FollowerRepository } from '../repositories/follower.repository'
import { CreateUserDto, UserResponseDto } from '../dtos/user.dto'

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private followerRepository: FollowerRepository
  ) {}

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

  follow = async (data: { followerId: string; followingId: string }) => {
    if (data.followerId === data.followingId)
      throw createError(422, 'Você não pode seguir a si mesmo')

    const target = await this.userRepository.findById(data.followingId)
    if (!target) throw createError(404, 'Usuário não encontrado')

    return this.followerRepository.create(data)
  }

  unfollow = async (data: { followerId: string; followingId: string }) => {
    return this.followerRepository.delete(data)
  }
}
