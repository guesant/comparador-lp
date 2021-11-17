import { nanoid } from "nanoid"
import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState
} from "react"
import { createContext } from "use-context-selector"
import { SelectedArchiveFile } from "./SelectedArchiveFile"

type ISuitePageUploadFilesFromZipContext = {
  selectedFiles: SelectedArchiveFile[]
  setSelectedFiles: Dispatch<SetStateAction<SelectedArchiveFile[]>>

  updateSelectedFiles: (files: FileList | null) => void
  appendSelectedFiles: (files: FileList | null) => void

  updateSelectedFile: (updatedSelectedFile: SelectedArchiveFile) => void
  removeFiles: (fileIdList: SelectedArchiveFile["id"][]) => void

  selectedFilesSelectAllCallbacks: MutableRefObject<Set<() => void>>
}

export const SuitePageUploadFilesFromZipContext = createContext(
  {} as ISuitePageUploadFilesFromZipContext
)

export const SuitePageUploadFilesFromZipContextProvider: FC = ({
  children
}) => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedArchiveFile[]>([])

  const selectedFilesSelectAllCallbacks = useRef(new Set<() => void>())

  const updateSelectedFiles = useCallback((files: FileList | null) => {
    setSelectedFiles(
      Array.from(files ?? []).map(
        (file): SelectedArchiveFile => ({
          file,
          id: nanoid(),
          sliceList: []
        })
      )
    )
  }, [])

  const appendSelectedFiles = useCallback((files: FileList | null) => {
    files &&
      setSelectedFiles((selectedFiles) => [
        ...selectedFiles,
        ...Array.from(files ?? []).map(
          (file): SelectedArchiveFile => ({
            file,
            id: nanoid(),
            sliceList: []
          })
        )
      ])
  }, [])

  const updateSelectedFile = useCallback(
    (updatedSelectedFile: SelectedArchiveFile) => {
      setSelectedFiles((files) =>
        files.map((i) =>
          i.id === updatedSelectedFile.id ? updatedSelectedFile : i
        )
      )
    },
    [setSelectedFiles]
  )

  const removeFiles = useCallback((fileIdList: SelectedArchiveFile["id"][]) => {
    setSelectedFiles((files) =>
      files.filter(({ id }) => !fileIdList.includes(id))
    )
  }, [])

  return (
    <SuitePageUploadFilesFromZipContext.Provider
      value={{
        removeFiles,
        selectedFiles,
        setSelectedFiles,
        updateSelectedFile,
        appendSelectedFiles,
        updateSelectedFiles,
        selectedFilesSelectAllCallbacks
      }}
    >
      {children}
    </SuitePageUploadFilesFromZipContext.Provider>
  )
}
