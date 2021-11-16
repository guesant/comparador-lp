import { APIHttp } from "./APIHttp"

export const FindById = (http: APIHttp) => async (comparisonId: string) => {
  await http.delete(`/comparison/${comparisonId}`)
}
