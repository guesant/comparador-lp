import { APIHttp } from "./APIHttp"

export const Delete = (http: APIHttp) => async (fileGroupId: string) => {
  await http.delete(`/fileGroups/${fileGroupId}`)
}

export const StoreFiles =
  (http: APIHttp) => async (fileGroupId: string, files: File[]) => {
    const formData = new FormData()

    for (const index in files) {
      const file = files[index]
      formData.set(`file-${index}`, file)
    }

    const { data } = await http.post(
      `/fileGroups/${fileGroupId}/files`,
      formData
    )
    return data
  }
