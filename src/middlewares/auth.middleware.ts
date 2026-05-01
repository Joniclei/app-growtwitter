import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization

  console.log("authorization:", authorization)  // correto
  if (!authorization) throw createError(401, 'Token não informado')

  const token = authorization.split(' ')[1]

  console.log("token:", token)  // correto

  if (!token) throw createError(401, 'Token inválido')

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string }

  req.user = { id: payload.id, username: payload.username }

  next()
}
