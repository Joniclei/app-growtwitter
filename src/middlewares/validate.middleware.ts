import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import createError from 'http-errors'

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      throw createError(400, result.error.errors[0].message)
    }
    req.body = result.data
    next()
  }
}
