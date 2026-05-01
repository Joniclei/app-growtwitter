import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  username: z.string().min(3, 'Username deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  avatarUrl: z.string().url('URL inválida').optional(),
})

export const loginSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export type CreateUserDto = z.infer<typeof createUserSchema>

export type UserResponseDto = {
  id: string
  name: string
  username: string
  email: string
  avatarUrl?: string | null
  createdAt: Date
}
