import Box from "@mui/material/Box"
import StepFilterContentSidebarActions from "./StepFilterContentSidebarActions"
import StepFilterContentSidebarFilterInput from "./StepFilterContentSidebarFilterInput"

const StepFilterContentSidebar = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <StepFilterContentSidebarFilterInput />
        <StepFilterContentSidebarActions />
      </Box>
    </Box>
  )
}

export default StepFilterContentSidebar
