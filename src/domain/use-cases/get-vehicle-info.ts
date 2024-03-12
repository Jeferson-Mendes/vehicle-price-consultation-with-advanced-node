/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IGetVehicleInfo, HttpCache } from '@/domain/contracts/gateways'

type Setup = (vehicleApi: IGetVehicleInfo, httpCache: HttpCache) => GetVehicleInfo
type Input = {
  queryType: 'carros' | 'motos' | 'caminhoes'
  brand: number
  model: string
  year: string
}
type Output = any
export type GetVehicleInfo = (input: Input) => Promise<Output>

export const setupVehicleInfo: Setup = (vehicleApi, httpCache) => async ({ brand, model, queryType, year }) => {
  const cachedVehicle = await httpCache.get({ brand, model, year })

  if (!cachedVehicle) {
    const record = await vehicleApi.getVehicleInfo({ brand, model, queryType, year })
    if (record instanceof Error) return record

    await httpCache.save({ brand, model, year },
      {
        statusCode: 200,
        data: record
      })
    return record
  }

  return cachedVehicle.data
}
