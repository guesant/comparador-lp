import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useCallback } from "react"
import { useContextSelector } from "use-context-selector"
import { SuitePageUploadFilesFromZipContext } from "../SuitePageUploadFilesFromZipContext"

const StepSelectFilesListSelected = () => {
  const selectedFiles = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ selectedFiles }) => selectedFiles
  )

  const removeFiles = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ removeFiles }) => removeFiles
  )

  const handleRemove = useCallback(
    (id: string) => {
      removeFiles([id])
    },
    [removeFiles]
  )

  if (selectedFiles.length === 0) {
    return null
  }

  return (
    <Box sx={{ my: 2 }}>
      <List>
        <Divider />
        {selectedFiles.map((selectedFile) => (
          <ListItem button disableRipple divider key={selectedFile.id}>
            <ListItemIcon>
              <IconButton onClick={() => handleRemove(selectedFile.id)}>
                <CloseIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText>{selectedFile.file.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default StepSelectFilesListSelected
