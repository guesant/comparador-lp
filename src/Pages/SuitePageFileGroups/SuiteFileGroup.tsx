import Box from "@mui/material/Box"
import { FC } from "react"
import SuiteFileGroupFileList from "./SuiteFileGroupFileList"

const SuiteFileGroup: FC<{ fileGroup: any }> = ({ fileGroup }) => (
  <Box>
    <SuiteFileGroupFileList fileGroup={fileGroup} />
  </Box>
)

export default SuiteFileGroup
