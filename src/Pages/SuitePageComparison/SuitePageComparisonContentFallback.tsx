import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
import Loading from "../../Components/Loading"

export const SuitePageComparisonContentFallbackLoading = () => {
  return (
    <DialogContent>
      <Loading />
    </DialogContent>
  )
}
export const SuitePageComparisonContentFallbackError = () => {
  return (
    <DialogContent>
      <Typography>Ocorreu um erro.</Typography>
    </DialogContent>
  )
}
