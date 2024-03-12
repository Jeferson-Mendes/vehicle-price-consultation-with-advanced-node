import { setupVehicleInfo, GetVehicleInfo } from '@/domain/use-cases'
import { makeHttpRedisCache, makeVehiclePriceApi } from '@/main/factories/infra/gateways'

export const makeGetVehicleInfo = (): GetVehicleInfo => {
  return setupVehicleInfo(
    makeVehiclePriceApi(),
    makeHttpRedisCache('redis-cache')
  )
}
