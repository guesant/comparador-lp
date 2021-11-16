import Box from "@mui/material/Box"
import SuiteFileGroupsHeader from "./SuiteFileGroupsHeader"
import SuiteFileGroupsList from "./SuiteFileGroupsList"

const SuiteFileGroups = () => (
  <Box sx={{ my: 3 }}>
    <SuiteFileGroupsHeader />
    <SuiteFileGroupsList />
  </Box>
)

export default SuiteFileGroups
