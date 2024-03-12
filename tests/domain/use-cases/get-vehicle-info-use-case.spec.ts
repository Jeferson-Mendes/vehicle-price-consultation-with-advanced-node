import { IGetVehicleInfo } from '@/domain/contracts/gateways'
import { GetVehicleInfo as GetVehicleInfoUseCase, setupVehicleInfo } from '@/domain/use-cases'
import { RedisHttpCache } from '@/infra/gateways'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetVehicleInfoUseCase', () => {
  let input: {
    queryType: 'carros' | 'motos' | 'caminhoes'
    brand: number
    model: string
    year: string
  }
  let vehicleApi: MockProxy<IGetVehicleInfo>
  let httpRedisCache: MockProxy<RedisHttpCache>
  let sut: GetVehicleInfoUseCase

  beforeEach(() => {
    input = {
      queryType: 'carros',
      brand: 1,
      model: 'any_model',
      year: 'any_year'
    }
    vehicleApi = mock()
    httpRedisCache = mock()
    vehicleApi.getVehicleInfo.mockResolvedValue(
      {
        // TipoVeiculo: 1,
        // Valor: 'any_price',
        // Marca: 'any_brand',
        // Modelo: 'any_model',
        // AnoModelo: 1,
        // Combustivel: 'any',
        // CodigoFipe: 'any',
        // MesReferencia: 'any',
        // SiglaCombustivel: 'any',
        type: 1,
        price: 'any_price',
        brand: 'any_brand',
        model: 'any_model',
        year: '1',
        fuelType: 'any',
        fipeCode: 'any',
        referenceMonth: 'any',
        fuelIdentity: 'any'
      }
    )
  })

  beforeEach(() => {
    sut = setupVehicleInfo(vehicleApi, httpRedisCache)
  })

  it('should call get vehicle with correct input', async () => {
    await sut(input)

    expect(vehicleApi.getVehicleInfo).toHaveBeenCalledWith(input)
    expect(vehicleApi.getVehicleInfo).toHaveBeenCalledTimes(1)
  })

  it('should return correct data on success', async () => {
    const result = await sut(input)
    expect(result).toEqual({
      type: 1,
      price: 'any_price',
      brand: 'any_brand',
      model: 'any_model',
      year: '1',
      fuelType: 'any',
      fipeCode: 'any',
      referenceMonth: 'any',
      fuelIdentity: 'any'
    })
  })

  it('should throw if get vehicle throws', async () => {
    const error = new Error('save_error')
    vehicleApi.getVehicleInfo.mockRejectedValueOnce(error)

    const promise = sut(input)

    await expect(promise).rejects.toThrow(error)
  })
})
