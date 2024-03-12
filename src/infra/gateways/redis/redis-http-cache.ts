/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { SetOptions } from '@redis/client'
import { HttpCache } from '@/domain/contracts'
import { RedisConnection } from '@/infra/gateways'
import { HttpResponse } from '@/application/helpers'
import { env } from '@/main/config/env'

export class RedisHttpCache implements HttpCache {
  constructor (
    private readonly prefix: string,
    private readonly connection: RedisConnection = RedisConnection.getInstance()
  ) {}

  async get (httpRequest: any): Promise<HttpResponse | undefined> {
    if (!env.redis.enabled) return undefined

    const { brand, model, year } = httpRequest
    const data = await this.connection.getClient().get(`${this.prefix}-${brand as string}-${model as string}-${year as string}`)
    if (data) {
      return JSON.parse(data)
    }
  }

  async save (httpRequest: any, httpResponse: HttpResponse): Promise<void> {
    if (!env.redis.enabled) return undefined

    const { brand, model, year } = httpRequest
    const options: SetOptions = {
      EX: 86400
    }

    await this.connection.getClient().set(
      `${this.prefix}-${brand as string}-${model as string}-${year as string}`,
      JSON.stringify(httpResponse),
      options)
  }

  async clear (httpRequest: any): Promise<void> {
    if (!env.redis.enabled) return undefined

    const { brand, model, year } = httpRequest
    await this.connection.getClient().del(`${this.prefix}-${brand as string}-${model as string}-${year as string}`)
  }
}
