import Box from "@mui/material/Box"
import { FC } from "react"
import AppContainer from "./AppContainer"

const AppContent: FC = ({ children }) => {
  return (
    <AppContainer>
      <Box sx={{ px: 3 }}>{children}</Box>
    </AppContainer>
  )
}

export default AppContent
