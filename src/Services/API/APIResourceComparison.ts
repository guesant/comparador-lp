import { APIHttp } from "./APIHttp"

export const FindById = (http: APIHttp) => async (comparisonId: string) => {
  const { data } = await http.get(`/comparisons/${comparisonId}`)
  return data
}
