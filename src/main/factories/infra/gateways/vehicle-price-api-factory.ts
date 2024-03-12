import { VehiclePriceApi } from '@/infra/gateways'
import { makeAxiosHttpClient } from '@/main/factories/infra/gateways'
import { env } from '@/main/config/env'

export const makeVehiclePriceApi = (): VehiclePriceApi => {
  return new VehiclePriceApi(makeAxiosHttpClient(), env.vehiclePriceApi.baseUrl)
}
