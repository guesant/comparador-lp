import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { useContextSelector } from "use-context-selector"
import { StepFilterContentContext } from "./StepFilterContentContext"

export const StepFilterContentFilterInput = () => {
  const filterText = useContextSelector(
    StepFilterContentContext,
    ({ filterText }) => filterText
  )
  const setFilterText = useContextSelector(
    StepFilterContentContext,
    ({ setFilterText }) => setFilterText
  )

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        size={"small"}
        margin={"none"}
        value={filterText}
        placeholder="Filtro Glob"
        onChange={(e) => setFilterText(e.target.value)}
      />
    </Box>
  )
}
