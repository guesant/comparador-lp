import Box from "@mui/material/Box"
import StepSelectFilesFileInput from "./StepSelectFilesFileInput"
import StepSelectFilesListSelected from "./StepSelectFilesListSelected"

const StepSelectFiles = () => {
  return (
    <Box sx={{ flex: "1 1" }}>
      <StepSelectFilesFileInput />
      <StepSelectFilesListSelected />
    </Box>
  )
}

export default StepSelectFiles
