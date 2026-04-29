const tokenBlacklist = new Map<string, number>()

export function addToBlacklist(token: string): void {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000
  tokenBlacklist.set(token, expiresAt)
}

export function isBlacklisted(token: string): boolean {
  return tokenBlacklist.has(token)
}

setInterval(() => {
  const now = Date.now()
  for (const [token, expiresAt] of tokenBlacklist) {
    if (now > expiresAt) tokenBlacklist.delete(token)
  }
},  60 * 60 * 1000)
