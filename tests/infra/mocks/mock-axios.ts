import axios from 'axios'

export const mockHttpResponse = (): any => ({
  statusCode: 200,
  testandoaqui: { any: 'data' }
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
