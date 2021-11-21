import ClearIcon from "@mui/icons-material/Clear"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import { useContextSelector } from "use-context-selector"
import { handleSelectAllOnFocus } from "../../../Services/Utils/handleSelectAllOnFocus"
import { StepFilterContentContext } from "./StepFilterContentContext"

const StepFilterContentSidebarFilterInput = () => {
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
        onFocus={handleSelectAllOnFocus}
        onChange={(e) => setFilterText(e.target.value)}
        InputProps={{
          style: { paddingRight: 0 },
          endAdornment: (
            <InputAdornment position="end">
              {filterText.length > 0 && (
                <IconButton onClick={() => setFilterText("")}>
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          )
        }}
      />
    </Box>
  )
}

export default StepFilterContentSidebarFilterInput
