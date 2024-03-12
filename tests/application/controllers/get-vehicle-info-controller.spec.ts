import { Controller, GetVehicleInfoController } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { Required, RequiredString } from '@/application/validation'

describe('GetVehicleInfoController', () => {
  let sut: GetVehicleInfoController
  let getVehicleInfo: jest.Mock
  let input: {
    queryType: 'carros' | 'motos' | 'caminhoes'
    brand: number
    model: string
    year: string }

  beforeAll(() => {
    input = {
      queryType: 'carros',
      brand: 1,
      model: 'any_model',
      year: 'any_year'
    }
    getVehicleInfo = jest.fn()
    getVehicleInfo.mockResolvedValue({
      TipoVeiculo: 1,
      Valor: 'any_price',
      Marca: 'any_brand',
      Modelo: 'any_model',
      AnoModelo: 1,
      Combustivel: 'any',
      CodigoFipe: 'any',
      MesReferencia: 'any',
      SiglaCombustivel: 'any'
    })
  })

  beforeEach(() => {
    sut = new GetVehicleInfoController(getVehicleInfo)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const { brand, model, queryType, year } = input
    const validators = sut.buildValidators(input)

    expect(validators).toEqual([
      new Required(brand, 'brand'),
      new RequiredString(model, 'model'),
      new RequiredString(queryType, 'queryType'),
      new RequiredString(year, 'year')
    ])
  })

  it('should call get vehicle info use case with correct input', async () => {
    await sut.handle(input)

    expect(getVehicleInfo).toHaveBeenCalledWith(input)
    expect(getVehicleInfo).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if get benefit fails', async () => {
    const error = new Error('some_error')
    getVehicleInfo.mockResolvedValueOnce(error)

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    getVehicleInfo.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 if get vehicle succeeds', async () => {
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        TipoVeiculo: 1,
        Valor: 'any_price',
        Marca: 'any_brand',
        Modelo: 'any_model',
        AnoModelo: 1,
        Combustivel: 'any',
        CodigoFipe: 'any',
        MesReferencia: 'any',
        SiglaCombustivel: 'any'
      }
    })
  })
})
