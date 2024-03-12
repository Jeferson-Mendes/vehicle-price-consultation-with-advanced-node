import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeGetVehicleInfoController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/vehicles/type/:queryType/brand/:brand/model/:model/year/:year', adapt(makeGetVehicleInfoController()))
}
