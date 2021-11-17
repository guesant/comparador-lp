import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useCallback, useEffect, useMemo } from "react"
import { FixedSizeList } from "react-window"
import { useContextSelector } from "use-context-selector"
import { SuitePageUploadFilesFromZipContext } from "../SuitePageUploadFilesFromZipContext"
import { StepFilterContentContext } from "./StepFilterContentContext"
import { StepFilterContentListItemContentRow } from "./StepFilterContentListItemContentRow"
import { StepFilterContentListItemContext } from "./StepFilterContentListItemContext"

const useHandleSelectAllFilteredFiles = (filteredFiles: string[]) => {}

export const StepFilterContentListItemContent = () => {
  const libArchiveQuery = useContextSelector(
    StepFilterContentListItemContext,
    ({ libArchiveQuery }) => libArchiveQuery
  )

  const files = useMemo(
    () => libArchiveQuery.data ?? [],
    [libArchiveQuery.data]
  )

  const isMatch = useContextSelector(
    StepFilterContentContext,
    ({ isMatch }) => isMatch
  )

  const filteredFiles = useMemo(
    () => files.filter(({ filename }) => isMatch(filename)),
    [isMatch, files]
  )

  const patchSelectedFile = useContextSelector(
    StepFilterContentListItemContext,
    ({ patchSelectedFile }) => patchSelectedFile
  )

  const selectedFilesSelectAllCallbacks = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ selectedFilesSelectAllCallbacks }) => selectedFilesSelectAllCallbacks
  )

  const handleSelectAllFilteredFiles = useCallback(() => {
    patchSelectedFile((draft) => {
      draft.sliceList = filteredFiles.map(({ filename }) => filename)
    })
  }, [patchSelectedFile, filteredFiles])

  useEffect(() => {
    selectedFilesSelectAllCallbacks.current.add(handleSelectAllFilteredFiles)

    return () => {
      selectedFilesSelectAllCallbacks.current.delete(
        handleSelectAllFilteredFiles
      )
    }
  }, [selectedFilesSelectAllCallbacks, handleSelectAllFilteredFiles])

  if (libArchiveQuery.isLoading) {
    return <Box sx={{ my: 2 }}>Carregando...</Box>
  }

  return (
    <>
      {filteredFiles.length === 0 && (
        <Box sx={{ my: 2 }}>
          <Typography>- Vazio.</Typography>
        </Box>
      )}

      {filteredFiles.length > 0 && (
        <FixedSizeList
          width="100%"
          height={250}
          itemSize={59}
          itemData={filteredFiles}
          itemCount={filteredFiles.length}
        >
          {StepFilterContentListItemContentRow}
        </FixedSizeList>
      )}
    </>
  )
}
