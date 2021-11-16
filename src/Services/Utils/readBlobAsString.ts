export const readBlobAsString = (blob: Blob) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.readAsText(blob)
  })
