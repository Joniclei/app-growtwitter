import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { CreateUserDto } from '../dtos/user.dto'

export class UserController {
  constructor(private userService: UserService) {}

  create = async (req: Request, res: Response) => {
    const data: CreateUserDto = req.body
    const user = await this.userService.create(data)
    return res.status(201).json(user)
  }

  findByUsername = async (req: Request, res: Response) => {
    const { username } = req.params as { username: string }
    const user = await this.userService.findByUsername(username)
    return res.status(200).json(user)
  }
}


