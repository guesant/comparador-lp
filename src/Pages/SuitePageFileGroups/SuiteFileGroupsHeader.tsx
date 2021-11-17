import AddIcon from "@mui/icons-material/Add"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

const SuiteFileGroupsHeader = () => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography sx={{ flex: 1 }} variant="h6">
        Arquivos
      </Typography>
      <Link to="upload">
        <Button startIcon={<AddIcon />} variant="outlined">
          Enviar Arquivo(s)
        </Button>
      </Link>
    </Box>
  )
}

export default SuiteFileGroupsHeader
