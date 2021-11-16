import Box from "@mui/material/Box"
import AppContainer from "../../Components/AppContainer"
import SuitesPageTable from "./SuitesPageTable"

const SuitesPageContent = () => (
  <div>
    <AppContainer>
      <Box sx={{ m: 3 }} style={{ height: 400 }}>
        <SuitesPageTable />
      </Box>
    </AppContainer>
  </div>
)

export default SuitesPageContent
