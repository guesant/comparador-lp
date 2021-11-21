import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useCallback, useEffect, useMemo } from "react"
import { FixedSizeList } from "react-window"
import { useContextSelector } from "use-context-selector"
import { SuitePageUploadFilesFromZipContext } from "../SuitePageUploadFilesFromZipContext"
import StepFilterContentArchiveListItemContentRow from "./StepFilterContentArchiveListItemContentRow"
import { StepFilterContentArchiveListItemContext } from "./StepFilterContentArchiveListItemContext"
import { StepFilterContentContext } from "./StepFilterContentContext"

const StepFilterContentArchiveListItemContent = () => {
  const libArchiveQuery = useContextSelector(
    StepFilterContentArchiveListItemContext,
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
    StepFilterContentArchiveListItemContext,
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
    return <Box sx={{ m: 2 }}>Carregando...</Box>
  }

  if (filteredFiles.length === 0) {
    return (
      <Box sx={{ m: 2 }}>
        <Typography>- Vazio.</Typography>
      </Box>
    )
  }

  return (
    <>
      <FixedSizeList
        width="100%"
        height={230}
        itemSize={59}
        itemData={filteredFiles}
        itemCount={filteredFiles.length}
      >
        {StepFilterContentArchiveListItemContentRow}
      </FixedSizeList>
    </>
  )
}

export default StepFilterContentArchiveListItemContent
