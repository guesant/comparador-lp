import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { Link, useNavigate } from "react-router-dom"

const SuitePageUploadFiles = () => {
  const navigate = useNavigate()
  const handleClose = () => navigate("./..")

  return (
    <Dialog open={true} fullWidth={true} maxWidth={"sm"} onClose={handleClose}>
      <DialogTitle>Escolha uma Estratégia de Envio</DialogTitle>

      <Divider sx={{ mb: 0.5 }} />

      <DialogContent>
        <List>
          <Divider />
          <Link to={"./../upload-zip"}>
            <ListItemButton divider>
              <ListItemText>Arquivo Compactado</ListItemText>
              <ChevronRightIcon />
            </ListItemButton>
          </Link>
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SuitePageUploadFiles
