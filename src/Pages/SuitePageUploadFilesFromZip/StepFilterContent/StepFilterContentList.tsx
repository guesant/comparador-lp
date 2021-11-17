import Box from "@mui/material/Box"
import { useContextSelector } from "use-context-selector"
import { SuitePageUploadFilesFromZipContext } from "../SuitePageUploadFilesFromZipContext"
import { StepFilterContentListItem } from "./StepFilterContentListItem"
import { StepFilterContentListItemContextProvider } from "./StepFilterContentListItemContext"

export const StepFilterContentList = () => {
  const selectedFiles = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ selectedFiles }) => selectedFiles
  )

  return (
    <Box>
      {selectedFiles.map((selectedFile) => (
        <StepFilterContentListItemContextProvider
          key={selectedFile.id}
          selectedFile={selectedFile}
        >
          <StepFilterContentListItem />
        </StepFilterContentListItemContextProvider>
      ))}
    </Box>
  )
}
