import { HttpClient, HttpGetClient, HttpPostClient } from '@/infra/gateways'

import axios from 'axios'

type InputGet = HttpGetClient.Input
type InputPost = HttpPostClient.Input

export class AxiosHttpClient implements HttpClient {
  async get ({ url, params, headers }: InputGet): Promise<any> {
    const result = await axios.get(url, { params, headers })
    return result.data
  }

  async post ({ url, body, params, headers }: InputPost): Promise<any> {
    const result = await axios.post(url, body, { params, headers })
    return result.data
  }
}
