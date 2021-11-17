import produce, { Draft } from "immer"
import { FC, useCallback } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { createContext, useContextSelector } from "use-context-selector"
import LibArchive from "../../../Services/LibArchiveService"
import { SelectedArchiveFile } from "../SelectedArchiveFile"
import { SuitePageUploadFilesFromZipContext } from "../SuitePageUploadFilesFromZipContext"

type IFileGroupFromZipFileListItemContext = {
  selectedFile: SelectedArchiveFile
  libArchiveQuery: UseQueryResult<{ filename: string }[]>
  patchSelectedFile: (
    callback: (draft: Draft<SelectedArchiveFile>) => void
  ) => void
}

export const StepFilterContentListItemContext = createContext(
  {} as IFileGroupFromZipFileListItemContext
)

export const StepFilterContentListItemContextProvider: FC<{
  selectedFile: SelectedArchiveFile
}> = ({ selectedFile, children }) => {
  const libArchiveQuery = useQuery(
    [selectedFile.id, "libArchive-list"],
    async () => LibArchive.list(selectedFile.file)
  )

  const updateSelectedFile = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ updateSelectedFile }) => updateSelectedFile
  )

  const patchSelectedFile = useCallback(
    (callback: (draft: Draft<SelectedArchiveFile>) => void) =>
      updateSelectedFile(produce(selectedFile, callback)),
    [updateSelectedFile, selectedFile]
  )

  return (
    <StepFilterContentListItemContext.Provider
      value={{ selectedFile, libArchiveQuery, patchSelectedFile }}
    >
      {children}
    </StepFilterContentListItemContext.Provider>
  )
}
