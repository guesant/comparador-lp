import Button from "@mui/material/Button"
import { useNavigate, useParams } from "react-router-dom"
import { useContextSelector } from "use-context-selector"
import { useHttp } from "../../Hooks/useHttp"
import { StoreFiles } from "../../Services/API/APIResourceFileGroup"
import {
  CreateFileGroup,
  SyncComparisons
} from "../../Services/API/APIResourceSuites"
import LibArchive from "../../Services/LibArchiveService"
import { SuitePageContext } from "../SuitePage/SuitePageContext"
import { SuitePageUploadFilesFromZipContext } from "./SuitePageUploadFilesFromZipContext"

export const SuitePageUploadFilesFromZipSubmit = () => {
  const navigate = useNavigate()
  const handleClose = () => navigate("./..")

  const { id: suiteId } = useParams()

  const selectedFiles = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ selectedFiles }) => selectedFiles
  )

  const refetch = useContextSelector(
    SuitePageContext,
    ({ suiteQuery: { refetch } }) => refetch
  )

  const http = useHttp()

  const handleSubmit = async () => {
    for (const selectedFile of selectedFiles) {
      const { id: fileGroupId } = await CreateFileGroup(http)(suiteId)

      const archiveFileList = await LibArchive.list(selectedFile.file)

      const selectedArchiveFileList = archiveFileList.filter(({ filename }) =>
        selectedFile.sliceList.includes(filename)
      )

      const fileList = await LibArchive.extractWithPathNames(
        selectedFile.file,
        selectedArchiveFileList.map(({ filename }) => filename)
      )

      await StoreFiles(http)(fileGroupId, fileList)
      await SyncComparisons(http)(suiteId)
    }
    handleClose()
    await refetch()
  }

  return <Button onClick={handleSubmit}>Enviar</Button>
}
