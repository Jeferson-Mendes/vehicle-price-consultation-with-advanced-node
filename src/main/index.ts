/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import './config/module-alias'
import { env } from '@/main/config/env'
import { RedisConnection } from '@/infra/gateways'
import { RedisOptions } from '@/infra/repos'

import 'reflect-metadata'

Promise.all([
  // database connection when necessary
  env.redis.enabled ? RedisConnection.getInstance().connect(RedisOptions) : () => {}
]).then(async () => {
  const app = (await import('@/main/config/app')).default
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
}).catch(console.error)
