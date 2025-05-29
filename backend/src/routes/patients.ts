import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  const { fullname, phone, telegramId } = req.body
  const patient = await prisma.patient.create({ data: { fullname, phone, telegramId }})
  res.json(patient)
})

router.get('/', async (req, res) => {
  const q = req.query.q?.toString().toLowerCase()
  const patients = await prisma.patient.findMany()
  const filtered = q ? patients.filter(p => p.fullname.toLowerCase().includes(q)) : patients
  res.json(filtered)
})

export default router