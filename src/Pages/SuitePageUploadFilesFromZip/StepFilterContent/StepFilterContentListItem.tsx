import Box from "@mui/material/Box"
import { StepFilterContentListItemContent } from "./StepFilterContentListItemContent"
import { StepFilterContentListItemName } from "./StepFilterContentListItemName"

export const StepFilterContentListItem = () => {
  return (
    <Box>
      <StepFilterContentListItemName />
      <StepFilterContentListItemContent />
    </Box>
  )
}
