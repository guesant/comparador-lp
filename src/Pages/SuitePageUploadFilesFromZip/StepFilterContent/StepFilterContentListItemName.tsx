import Typography from "@mui/material/Typography"
import { useContextSelector } from "use-context-selector"
import { StepFilterContentListItemContext } from "./StepFilterContentListItemContext"

export const StepFilterContentListItemName = () => {
  const name = useContextSelector(
    StepFilterContentListItemContext,
    ({ selectedFile }) => selectedFile.file.name
  )
  return <Typography sx={{ my: 1 }}>{name}</Typography>
}
