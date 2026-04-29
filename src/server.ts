import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes/index'
import { errorMiddleware } from './middlewares/error.middleware'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorMiddleware)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
