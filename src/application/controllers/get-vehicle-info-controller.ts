import { GetVehicleInfo } from '@/domain/use-cases'
import { Controller } from './controller'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { badRequest, ok } from '@/application/helpers'

type HttpRequest = {
  queryType: 'carros' | 'motos' | 'caminhoes'
  brand: number
  model: string
  year: string
}

export class GetVehicleInfoController extends Controller {
  constructor (private readonly getVehicleInfo: GetVehicleInfo) {
    super()
  }

  async perform (input: HttpRequest): Promise<any> {
    const vehicle = await this.getVehicleInfo(input)

    if (vehicle instanceof Error) {
      return badRequest(vehicle)
    }

    return ok(vehicle)
  }

  override buildValidators ({ brand, model, queryType, year }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ fieldName: 'brand', value: brand }).required().build(),
      ...Builder.of({ fieldName: 'model', value: model }).required().build(),
      ...Builder.of({ fieldName: 'queryType', value: queryType }).required().build(),
      ...Builder.of({ fieldName: 'year', value: year }).required().build()
    ]
  }
}
