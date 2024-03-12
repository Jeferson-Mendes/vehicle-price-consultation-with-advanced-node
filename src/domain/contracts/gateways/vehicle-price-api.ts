import { VehicleModel } from '@/domain/models'

export interface IGetVehicleInfo {
  getVehicleInfo: (input: GetVehicleInfo.Input) => Promise<GetVehicleInfo.Output>
}

export namespace GetVehicleInfo {
  export type Input = {
    queryType: 'carros' | 'motos' | 'caminhoes'
    brand: number
    model: string
    year: string
  }
  export type Output = VehicleModel | Error
}
