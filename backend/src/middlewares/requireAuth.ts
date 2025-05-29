import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  const secret = process.env.JWT_SECRET || 'supersecret'

  if (!auth) return res.status(401).json({ error: 'Нет токена' })

  try {
    const token = auth.split(' ')[1]
    const payload = jwt.verify(token, secret)
    ;(req as any).user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Неверный токен' })
  }
}