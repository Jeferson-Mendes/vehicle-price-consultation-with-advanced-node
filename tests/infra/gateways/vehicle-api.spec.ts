import { BadRequestError } from '@/application/errors'
import { HttpClient, VehiclePriceApi } from '@/infra/gateways'

import { mock, MockProxy } from 'jest-mock-extended'

describe('VehiclePriceApi', () => {
  let httpClient: MockProxy<HttpClient>
  let baseUrl: string
  let sut: VehiclePriceApi

  const outputData = {
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

  beforeAll(() => {
    baseUrl = 'any_url'
    httpClient = mock()
  })

  beforeEach(() => {
    sut = new VehiclePriceApi(httpClient, baseUrl)
  })

  describe('Get vehicle', () => {
    beforeEach(() => {
      httpClient.get
        .mockResolvedValueOnce(outputData)
    })

    it('should return vehicle data', async () => {
      const data = await sut.getVehicleInfo(
        {
          brand: 1,
          model: 'any_model',
          queryType: 'carros',
          year: 'any'
        })

      expect(data).toEqual(outputData)
    })

    it('should return badRequestError if HttpGetClient throws', async () => {
      httpClient.get.mockReset().mockRejectedValueOnce(new Error('any_error'))

      const token = await sut.getVehicleInfo({
        brand: 1,
        model: 'any_model',
        queryType: 'carros',
        year: 'any'
      })

      expect(token).toEqual(new BadRequestError('any_error'))
    })
  })
})
