import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user.repository'

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  login = async (data: { username: string; password: string; fingerprint: string }) => {
    const user = await this.userRepository.findByUsername(data.username)
    if (!user) throw createError(401, 'Credenciais inválidas')

    const passwordMatch = await bcrypt.compare(data.password, user.password)
    if (!passwordMatch) throw createError(401, 'Credenciais inválidas')

    const token = jwt.sign(
      { id: user.id, username: user.username, fingerprint: data.fingerprint },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    return { token }
  }

  logout = (token: string) => {
    const { addToBlacklist } = require('../utils/blacklist')
    addToBlacklist(token)
  }
}
