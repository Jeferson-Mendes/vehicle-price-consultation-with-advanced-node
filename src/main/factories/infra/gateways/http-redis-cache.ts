import { RedisHttpCache } from '@/infra/gateways'

export const makeHttpRedisCache = (prefix: string): RedisHttpCache => {
  return new RedisHttpCache(prefix)
}
