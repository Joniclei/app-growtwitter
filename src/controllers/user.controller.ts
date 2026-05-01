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

  follow = async (req: Request, res: Response) => {
    const followerId = req.user.id
    const followingId = req.params.id as string
    await this.userService.follow({ followerId, followingId })
    return res.status(204).send()
  }

  unfollow = async (req: Request, res: Response) => {
    const followerId = req.user.id
    const followingId = req.params.id as string
    await this.userService.unfollow({ followerId, followingId })
    return res.status(204).send()
  }
}


