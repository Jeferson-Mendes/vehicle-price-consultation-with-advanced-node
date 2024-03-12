export interface HttpClient {
  get: <T = any> (input: HttpGetClient.Input) => Promise<T>
  post: <T = any> (input: HttpPostClient.Input) => Promise<T>
}

export namespace HttpGetClient {
  export type Input = {
    url: string
    params?: object
    headers?: object
  }
}

export namespace HttpPostClient {
  export type Input = {
    url: string
    body: any
    params?: object
    headers?: object
  }
}
