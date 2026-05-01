import { z } from 'zod'

export const createTweetSchema = z.object({
  content: z.string({ required_error: 'Conteúdo é obrigatório' }).min(1, 'Conteúdo é obrigatório').max(280, 'Tweet deve ter no máximo 280 caracteres'),
})
