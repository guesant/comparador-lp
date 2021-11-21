import Box from "@mui/material/Box"
import StepFilterContentArchiveList from "./StepFilterContentArchiveList"
import { StepFilterContentContextProvider } from "./StepFilterContentContext"
import StepFilterContentSidebar from "./StepFilterContentSidebar"

const StepFilterContent = () => {
  return (
    <>
      <StepFilterContentContextProvider>
        <Box
          sx={{
            gap: 1,
            flex: "1 1",
            display: "grid",
            gridTemplateColumns: "2fr 1fr"
          }}
        >
          <StepFilterContentArchiveList />
          <StepFilterContentSidebar />
        </Box>
      </StepFilterContentContextProvider>
    </>
  )
}

export default StepFilterContent
