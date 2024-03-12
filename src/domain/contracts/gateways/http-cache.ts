import { HttpResponse } from '@/application/helpers'

export interface HttpCache {
  get: (httpRequest: any) => Promise<HttpResponse | undefined>
  save: (httpRequest: any, response: HttpResponse) => Promise<void>
  clear: (httpRequest: any) => Promise<void>
}
