import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import StepFilterContentActions from "./StepFilterContentActions"
import { StepFilterContentContextProvider } from "./StepFilterContentContext"
import { StepFilterContentFilterInput } from "./StepFilterContentFilterInput"
import { StepFilterContentList } from "./StepFilterContentList"

const StepFilterContent = () => {
  return (
    <Box>
      <StepFilterContentContextProvider>
        <StepFilterContentFilterInput />
        <Divider sx={{ my: 2 }} />
        <StepFilterContentActions />
        <Divider sx={{ my: 2 }} />
        <StepFilterContentList />
      </StepFilterContentContextProvider>
    </Box>
  )
}

export default StepFilterContent
