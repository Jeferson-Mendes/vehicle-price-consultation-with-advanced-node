import { HttpClient } from '@/infra/gateways'
import { GetVehicleInfo, IGetVehicleInfo } from '@/domain/contracts/gateways'
import { BadRequestError } from '@/application/errors'

export class VehiclePriceApi implements IGetVehicleInfo {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly baseUrl: string
  ) {}

  async getVehicleInfo ({ queryType, brand, model, year }: GetVehicleInfo.Input): Promise<GetVehicleInfo.Output> {
    try {
      const vehicle = await this.httpClient.get({
        url: `${this.baseUrl}/${queryType}/marcas/${brand}/modelos/${model}/anos/${year}`
      })
      return vehicle
    } catch (error: any) {
      return new BadRequestError(error.message)
    }
  }
}
