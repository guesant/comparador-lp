import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import SelectAllIcon from "@mui/icons-material/SelectAll"
import IconButton from "@mui/material/IconButton"
import produce from "immer"
import { useCallback } from "react"
import { useContextSelector } from "use-context-selector"
import { SuitePageUploadFilesFromZipContext } from "../SuitePageUploadFilesFromZipContext"

const StepFilterContentSidebarActions = () => {
  const selectedFilesSelectAllCallbacks = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ selectedFilesSelectAllCallbacks }) => selectedFilesSelectAllCallbacks
  )

  const setSelectedFiles = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ setSelectedFiles }) => setSelectedFiles
  )

  const handleSelectFiltered = useCallback(() => {
    for (const callback of Array.from(
      selectedFilesSelectAllCallbacks.current
    )) {
      callback()
    }
  }, [selectedFilesSelectAllCallbacks])

  const handleClearSelection = useCallback(() => {
    setSelectedFiles((selectedFiles) =>
      selectedFiles.map((selectedFile) =>
        produce(selectedFile, (draft) => {
          draft.sliceList = []
        })
      )
    )
  }, [setSelectedFiles])

  return (
    <>
      <IconButton onClick={handleSelectFiltered}>
        <SelectAllIcon />
      </IconButton>
      <IconButton onClick={handleClearSelection}>
        <HighlightOffIcon />
      </IconButton>
    </>
  )
}

export default StepFilterContentSidebarActions
