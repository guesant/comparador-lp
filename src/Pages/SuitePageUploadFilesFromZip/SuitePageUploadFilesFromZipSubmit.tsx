import Button from "@mui/material/Button"
import { useCallback, useMemo } from "react"
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
  const http = useHttp()
  const navigate = useNavigate()
  const { id: suiteId } = useParams()

  const isBusy = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ isBusy }) => isBusy
  )
  const setIsBusy = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ setIsBusy }) => setIsBusy
  )

  const refetch = useContextSelector(
    SuitePageContext,
    ({ suiteQuery: { refetch } }) => refetch
  )

  const selectedFiles = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ selectedFiles }) => selectedFiles
  )

  const handleClose = useCallback(() => navigate("./.."), [navigate])

  const canSubmit = useMemo(
    () => !isBusy && selectedFiles.some((i) => i.sliceList.length > 0),
    [isBusy, selectedFiles]
  )

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) {
      return
    }

    setIsBusy(true)

    try {
      for (const selectedFile of selectedFiles) {
        const { id: fileGroupId } = await CreateFileGroup(http)(suiteId)

        const archiveFileList = await LibArchive.list(selectedFile.file)

        const fileList = await LibArchive.extractWithPathNames(
          selectedFile.file,
          archiveFileList
            .filter(({ filename }) => selectedFile.sliceList.includes(filename))
            .map(({ filename }) => filename)
        )

        await StoreFiles(http)(fileGroupId, fileList)
      }
      await SyncComparisons(http)(suiteId)
      await refetch()
      handleClose()
    } catch (e) {}

    setIsBusy(false)
  }, [canSubmit, suiteId, refetch, http, handleClose, selectedFiles])

  return (
    <Button disabled={!canSubmit} onClick={handleSubmit}>
      Enviar
    </Button>
  )
}
