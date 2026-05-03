import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { generateFingerprint } from '../utils/fingerprint'

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const fingerprint = generateFingerprint(req)
    const result = await this.authService.login({ username, password, fingerprint })
    return res.status(200).json(result)
  }

  logout = (req: Request, res: Response) => {
    const token = req.headers.authorization!.split(' ')[1]
    this.authService.logout(token)
    return res.status(204).send()
  }
}
