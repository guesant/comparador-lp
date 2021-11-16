import { APIHttp } from "./APIHttp"

export const List = (http: APIHttp) => async () => {
  const { data } = await http.get("/suites")
  return data
}

export const Delete = (http: APIHttp) => async (suiteId: string) => {
  await http.delete(`/suites/${suiteId}`)
}

export const Create = (http: APIHttp) => async () => {
  const { data } = await http.post("/suites")
  return data
}

export const FindById = (http: APIHttp) => async (suiteId: string) => {
  const { data } = await http.get(`/suites/${suiteId}`)
  return data
}
