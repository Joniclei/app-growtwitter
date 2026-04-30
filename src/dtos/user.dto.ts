export type UserResponseDto = {
  id: string
  name: string
  username: string
  email: string
  avatarUrl?: string | null
  createdAt: Date
}

export type CreateUserDto = {
  name: string
  username: string
  email: string
  password: string
  avatarUrl?: string
}
