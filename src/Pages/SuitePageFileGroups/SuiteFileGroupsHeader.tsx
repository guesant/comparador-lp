import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const SuiteFileGroupsHeader = () => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography sx={{ flex: 1 }} variant="h6">
        Arquivos
      </Typography>
    </Box>
  )
}

export default SuiteFileGroupsHeader
