import { env } from '@/main/config/env'
import { RedisClientOptions } from '@redis/client'

export const RedisOptions: RedisClientOptions = {
  url: env.redis.uri
}
