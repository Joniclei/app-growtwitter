# Growtwitter API

API REST de rede social estilo Twitter desenvolvida com Node.js, TypeScript, Express e PostgreSQL.

## Deploy

- **API:** https://growtwitter-byy3.onrender.com
- **Documentação:** https://growtwitter-byy3.onrender.com/api/docs

## Tecnologias

- Node.js + TypeScript
- Express.js
- PostgreSQL + Prisma ORM
- JWT + bcrypt
- Zod
- Jest

## Como rodar localmente

**1. Clone o repositório**
```bash
git clone https://github.com/Joniclei/app-growtwitter
cd app-growtwitter
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure o `.env`**
```env
DATABASE_URL=postgresql://...
JWT_SECRET=sua-chave-secreta
PORT=3000
```

**4. Rode as migrations**
```bash
npx prisma migrate dev
```

**5. Inicie o servidor**
```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## Rotas

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/users | Criar usuário | Não |
| GET | /api/users/:username | Buscar usuário | Sim |
| POST | /api/auth/login | Login | Não |
| POST | /api/auth/logout | Logout | Sim |
| POST | /api/tweets | Criar tweet | Sim |
| POST | /api/tweets/:id/reply | Responder tweet | Sim |
| GET | /api/tweets/feed | Feed do usuário | Sim |
| POST | /api/tweets/:id/like | Curtir tweet | Sim |
| DELETE | /api/tweets/:id/like | Descurtir tweet | Sim |
| POST | /api/users/:id/follow | Seguir usuário | Sim |
| DELETE | /api/users/:id/follow | Deixar de seguir | Sim |

## Testes

```bash
npm test
```
