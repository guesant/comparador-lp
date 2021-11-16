import { APIHttp } from "./APIHttp"

export const List = (http: APIHttp) => async () => {
  const { data } = await http.get("/files")
  return data
}

export const FindById = (http: APIHttp) => async (fileId: string) => {
  const { data } = await http.get(`/files/${fileId}`)
  return data
}

export const Delete = (http: APIHttp) => async (fileId: string) => {
  await http.delete(`/files/${fileId}`)
}

export const GetData = (http: APIHttp) => async (fileId: string) => {
  const { data } = await http.get(`/files/${fileId}/data`)
  return data
}
