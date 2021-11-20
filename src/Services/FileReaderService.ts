class FileReaderService {
  readAsArrayBuffer = (file: Blob) =>
    new Promise<ArrayBuffer>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as any)
      }
      reader.readAsBinaryString(file)
    })

  readAsString = (blob: Blob) =>
    new Promise<string>((resolve) => {
      const reader = new FileReader()

      reader.onload = () => {
        resolve(reader.result as string)
      }

      reader.readAsText(blob)
    })
}

export default new FileReaderService()
