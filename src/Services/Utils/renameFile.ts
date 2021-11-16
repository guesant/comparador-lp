export const renameFile = (file: File, newFileName: string) =>
  new File([file], newFileName, {
    type: file.type,
    lastModified: file.lastModified
  })
