import { Router } from 'express'
import { tweetController } from '../factories/tweet.factory'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { createTweetSchema } from '../dtos/tweet.dto'

export const tweetRouter = Router()

/**
 * @swagger
 * /api/tweets:
 *   post:
 *     summary: Criar tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: Meu primeiro tweet!
 *     responses:
 *       201:
 *         description: Tweet criado com sucesso
 */
tweetRouter.post('/', authMiddleware, validate(createTweetSchema), tweetController.create)

/**
 * @swagger
 * /api/tweets/{id}/reply:
 *   post:
 *     summary: Responder tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: Minha resposta!
 *     responses:
 *       201:
 *         description: Reply criado com sucesso
 *       404:
 *         description: Tweet não encontrado
 *       422:
 *         description: Não é possível responder a um reply
 */
tweetRouter.post('/:id/reply', authMiddleware, validate(createTweetSchema), tweetController.reply)

/**
 * @swagger
 * /api/tweets/feed:
 *   get:
 *     summary: Feed do usuário
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tweets do feed
 */
tweetRouter.get('/feed', authMiddleware, tweetController.feed)

/**
 * @swagger
 * /api/tweets/{id}/like:
 *   post:
 *     summary: Curtir tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Like adicionado
 *       404:
 *         description: Tweet não encontrado
 *   delete:
 *     summary: Descurtir tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Like removido
 */
tweetRouter.post('/:id/like', authMiddleware, tweetController.like)
tweetRouter.delete('/:id/like', authMiddleware, tweetController.unlike)
