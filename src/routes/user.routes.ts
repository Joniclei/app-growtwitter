import { Router } from 'express'
import { userController } from '../factories/user.factory'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { createUserSchema } from '../dtos/user.dto'

export const userRouter = Router()

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Criar usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, username, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               username:
 *                 type: string
 *                 example: joao
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               avatarUrl:
 *                 type: string
 *                 example: https://foto.com/img.jpg
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       409:
 *         description: Username ou email já em uso
 */
userRouter.post('/', validate(createUserSchema), userController.create)

/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Buscar usuário por username
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.get('/:username', authMiddleware, userController.findByUsername)

/**
 * @swagger
 * /api/users/{id}/follow:
 *   post:
 *     summary: Seguir usuário
 *     tags: [Users]
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
 *         description: Seguindo com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       422:
 *         description: Não é possível seguir a si mesmo
 *   delete:
 *     summary: Deixar de seguir usuário
 *     tags: [Users]
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
 *         description: Deixou de seguir com sucesso
 */
userRouter.post('/:id/follow', authMiddleware, userController.follow)
userRouter.delete('/:id/follow', authMiddleware, userController.unfollow)
