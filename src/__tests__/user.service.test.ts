import { UserService } from '../services/user.service'
import { UserRepository } from '../repositories/user.repository'
import { FollowerRepository } from '../repositories/follower.repository'

const mockUserRepository = {
  create: jest.fn(),
  findByUsername: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
} as unknown as UserRepository

const mockFollowerRepository = {
  findFollowing: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
} as unknown as FollowerRepository

const userService = new UserService(mockUserRepository, mockFollowerRepository)

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('deve lançar erro se username já existir', async () => {

      ;(mockUserRepository.findByUsername as jest.Mock).mockResolvedValue({ id: '1' })

      await expect(
        userService.create({
          name: 'João',
          username: 'joao',
          email: 'joao@email.com',
          password: '123456',
        })
      ).rejects.toMatchObject({ status: 409, message: 'Username já está em uso' })
    })

    it('deve lançar erro se email já tem no banco', async () => {
      ;(mockUserRepository.findByUsername as jest.Mock).mockResolvedValue(null)
      ;(mockUserRepository.findByEmail as jest.Mock).mockResolvedValue({ id: '1' })

      await expect(
        userService.create({
          name: 'João',
          username: 'joao',
          email: 'joao@email.com',
          password: '123456',
        })
      ).rejects.toMatchObject({ status: 409, message: 'Email já está em uso' })
    })

    it('deve criar usuário e retornar sem a senha', async () => {
      ;(mockUserRepository.findByUsername as jest.Mock).mockResolvedValue(null)
      ;(mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null)
      ;(mockUserRepository.create as jest.Mock).mockResolvedValue({
        id: 'uuid-1',
        name: 'João',
        username: 'joao',
        email: 'joao@email.com',
        avatarUrl: null,
        createdAt: new Date(),
      })

      const result = await userService.create({
        name: 'João',
        username: 'joao',
        email: 'joao@email.com',
        password: '123456',
      })

      expect(result).not.toHaveProperty('password')
      expect(result.username).toBe('joao')
    })
  })

  describe('follow', () => {
    it('deve lançar um erro se tentar seguir o si', async () => {
      await expect(
        userService.follow({ followerId: 'id-1', followingId: 'id-1' })
      ).rejects.toMatchObject({ status: 422, message: 'Você não pode seguir a si mesmo' })
    })

    it('deve lançar erro se usuario não existe', async () => {
      ;(mockUserRepository.findById as jest.Mock).mockResolvedValue(null)

      await expect(
        userService.follow({ followerId: 'id-1', followingId: 'id-2' })
      ).rejects.toMatchObject({ status: 404, message: 'Usuário não encontrado' })
    })
  })
})
