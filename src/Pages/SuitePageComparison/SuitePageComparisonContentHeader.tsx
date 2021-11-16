import CloseIcon from "@mui/icons-material/Close"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { FC } from "react"

const SuitePageComparisonContentHeader: FC<{ handleClose: () => void }> = ({
  handleClose
}) => {
  return (
    <AppBar position={"static"} color={"primary"}>
      <Toolbar>
        <Typography sx={{ flex: 1 }}>Comparação</Typography>
        <IconButton color={"inherit"} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default SuitePageComparisonContentHeader
