import { Request, Response, NextFunction } from 'express'
import { isHttpError } from 'http-errors'

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (isHttpError(error)) {
    return res.status(error.status).json({ error: error.message })
  }

  console.error(error)
  return res.status(500).json({ error: 'Erro interno do servidor' })
}
