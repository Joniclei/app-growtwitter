import { Request, Response, NextFunction } from 'express'
import { isHttpError } from 'http-errors'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (isHttpError(error)) {
    return res.status(error.status).json({ error: error.message })
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Dado já cadastrado' })
    }
  }

  console.error(error)
  return res.status(500).json({ error: 'Erro interno do servidor' })
}
