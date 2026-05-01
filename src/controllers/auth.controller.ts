import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'

export class AuthController {
  constructor(private authService: AuthService) { }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const result = await this.authService.login({ username, password })
    return res.status(200).json(result)
  }
}
