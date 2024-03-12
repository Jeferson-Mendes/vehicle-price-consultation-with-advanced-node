export const env = {
  vehiclePriceApi: {
    baseUrl: process.env.VEHICLE_PRICE_API_BASE_URL ?? ''
  },
  redis: {
    enabled: process.env.REDIS_ENABLED,
    uri: process.env.REDIS_URI ?? `redis://${process.env.REDIS_HOST as string}:${process.env.REDIS_PORT as string}`
  },
  port: process.env.PORT ?? 8080
}
