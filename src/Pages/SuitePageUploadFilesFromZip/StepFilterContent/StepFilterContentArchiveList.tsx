import Box from "@mui/material/Box"
import { useContextSelector } from "use-context-selector"
import { SuitePageUploadFilesFromZipContext } from "../SuitePageUploadFilesFromZipContext"
import StepFilterContentArchiveListItem from "./StepFilterContentArchiveListItem"
import { StepFilterContentArchiveListItemContextProvider } from "./StepFilterContentArchiveListItemContext"

const StepFilterContentArchiveList = () => {
  const selectedFiles = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ selectedFiles }) => selectedFiles
  )

  return (
    <Box
      sx={{
        overflow: "auto",
        pr: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >
      {selectedFiles.map((selectedFile) => (
        <StepFilterContentArchiveListItemContextProvider
          key={selectedFile.id}
          selectedFile={selectedFile}
        >
          <StepFilterContentArchiveListItem />
        </StepFilterContentArchiveListItemContextProvider>
      ))}
    </Box>
  )
}

export default StepFilterContentArchiveList
