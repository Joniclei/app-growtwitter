import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { isBlacklisted } from '../utils/blacklist'
import { generateFingerprint } from '../utils/fingerprint'

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization

  if (!authorization) throw createError(401, 'Token não informado')

  const token = authorization.split(' ')[1]

  if (!token) throw createError(401, 'Token inválido')

  if (isBlacklisted(token)) throw createError(401, 'Token inválido')

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string
    username: string
    fingerprint: string
  }

  const currentFingerprint = generateFingerprint(req)
  if (payload.fingerprint !== currentFingerprint) throw createError(401, 'Token inválido')

  req.user = { id: payload.id, username: payload.username }

  next()
}
