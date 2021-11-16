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

export const CreateFileGroup = (http: APIHttp) => async (suiteId: string) => {
  const { data } = await http.post(`/suites/${suiteId}/fileGroups`)
  return data
}

export const FindById = (http: APIHttp) => async (suiteId: string) => {
  const { data } = await http.get(`/suites/${suiteId}`)
  return data
}

export const ListFiles = (http: APIHttp) => async (suiteId: string) => {
  const { data } = await http.get(`/suites/${suiteId}/files`)
  return data
}

export const ListFileGroups = (http: APIHttp) => async (suiteId: string) => {
  const { data } = await http.get(`/suites/${suiteId}/fileGroups`)
  return data
}

export const ListComparisons = (http: APIHttp) => async (suiteId: string) => {
  const { data } = await http.get(`/suites/${suiteId}/comparisons`)
  return data
}

export const RunComparisons = (http: APIHttp) => async (suiteId: string) => {
  await http.post(`/suites/${suiteId}/comparisons/run`)
}

export const SyncComparisons = (http: APIHttp) => async (suiteId: string) => {
  await http.post(`/suites/${suiteId}/comparisons/sync`)
}
