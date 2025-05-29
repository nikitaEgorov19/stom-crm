import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = Router()
const prisma = new PrismaClient()
const secret = process.env.JWT_SECRET || 'supersecret'

router.post('/login', async (req, res) => {
  const { login, password } = req.body
  const user = await prisma.user.findUnique({ where: { login } })

  if (!user) return res.status(401).json({ error: 'Пользователь не найден' })

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return res.status(401).json({ error: 'Неверный пароль' })

  const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1d' })
  res.json({ token, role: user.role, doctorName: user.doctorName })
})

export default router