/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ConnectionNotFoundError } from '@/application/errors'
import { createClient, RedisClientOptions, RedisClientType, RedisModules, RedisFunctions, RedisScripts } from '@redis/client'

export class RedisConnection {
  private static instance?: RedisConnection
  private client?: RedisClientType<RedisModules, RedisFunctions, RedisScripts>

  private constructor () {}

  static getInstance (): RedisConnection {
    if (RedisConnection.instance === undefined) RedisConnection.instance = new RedisConnection()
    return RedisConnection.instance
  }

  async connect (options: RedisClientOptions): Promise<void> {
    if (!this.client?.isOpen) {
      this.client = createClient(options)
      await this.client.connect()
    }
  }

  async disconnect (): Promise<void> {
    if (this.client?.isOpen) {
      await this.client?.disconnect()
      this.client = undefined
    }
  }

  getClient (): RedisClientType<RedisModules, RedisFunctions, RedisScripts> {
    if (!this.client?.isOpen) throw new ConnectionNotFoundError()
    return this.client
  }
}
