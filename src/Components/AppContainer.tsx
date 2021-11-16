import Box from "@mui/material/Box"
import { FC } from "react"

export const APP_CONTAINER_MAX_WIDTH = "810px"

const AppContainer: FC = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: APP_CONTAINER_MAX_WIDTH,
        margin: "0 auto",
        width: "100%"
      }}
    >
      {children}
    </Box>
  )
}

export default AppContainer
