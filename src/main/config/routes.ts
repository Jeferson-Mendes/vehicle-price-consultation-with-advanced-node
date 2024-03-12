import { Router, Express } from 'express'
import setupVehicleRoutes from '@/main/routes/vehicle.routes'

export const setupRoutes = (app: Express): void => {
  const router = Router({ mergeParams: true })
  setupVehicleRoutes(router)
  app.use(router)
  app.get('/health', (req, res) => res.send({
    status: 'online',
    version: '1.0.0'
  }))
}
