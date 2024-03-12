import { makeGetVehicleInfo } from '@/main/factories/domain/use-cases'
import { GetVehicleInfoController } from '@/application/controllers'

export const makeGetVehicleInfoController = (): GetVehicleInfoController => {
  return new GetVehicleInfoController(makeGetVehicleInfo())
}
