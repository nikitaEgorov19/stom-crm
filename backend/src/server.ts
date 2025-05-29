import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import patientRoutes from './routes/patients'
import appointmentRoutes from './routes/appointments'
import serviceRoutes from './routes/services'
import statisticsRoutes from './routes/statistics'
import { requireAuth } from './middlewares/requireAuth'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('🦷 Стоматология API работает!')
})

app.use('/api/auth', authRoutes)
app.use('/api/patients', requireAuth, patientRoutes)
app.use('/api/appointments', requireAuth, appointmentRoutes)
app.use('/api/services', requireAuth, serviceRoutes)
app.use('/api/statistics', requireAuth, statisticsRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
})