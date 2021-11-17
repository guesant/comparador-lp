import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import produce from "immer"
import { useCallback } from "react"
import { useContextSelector } from "use-context-selector"
import { SuitePageUploadFilesFromZipContext } from "../SuitePageUploadFilesFromZipContext"

const StepFilterContentActions = () => {
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
    <Box sx={{ my: 2 }}>
      <ButtonGroup fullWidth variant="outlined">
        <Button onClick={handleSelectFiltered}>
          Selecionar Arquivos Visíveis
        </Button>
        <Button onClick={handleClearSelection}>Limpar Seleção</Button>
      </ButtonGroup>
    </Box>
  )
}

export default StepFilterContentActions
