import Box from "@mui/material/Box"
import DialogContent from "@mui/material/DialogContent"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { useContextSelector } from "use-context-selector"
import Loading from "../../Components/Loading"
import { SuitePageComparisonContext } from "./SuitePageComparisonContext"
import SuitePageComparisonOverviewDiff from "./SuitePageComparisonOverviewDiff"

const SuitePageComparisonOverview = () => {
  const isLoading = useContextSelector(
    SuitePageComparisonContext,
    ({ comparisonQuery: { isLoading } }) => isLoading
  )
  const isError = useContextSelector(
    SuitePageComparisonContext,
    ({ comparisonQuery: { isError } }) => isError
  )

  const data = useContextSelector(
    SuitePageComparisonContext,
    ({ comparisonQuery }) => comparisonQuery.data
  )

  if (isLoading) {
    return (
      <DialogContent>
        <Loading />
      </DialogContent>
    )
  }

  if (isError) {
    return (
      <DialogContent>
        <Typography>Ocorreu um erro.</Typography>
      </DialogContent>
    )
  }

  return (
    <>
      <Divider />

      <DialogContent sx={{ pt: 0, mt: 0 }}>
        <Box sx={{ my: 2 }}>
          <Typography component={"span"}>
            <span style={{ fontWeight: "bold" }}>Status:</span> {data.status}
          </Typography>
          <Typography component={"span"}>
            {" "}
            | <span style={{ fontWeight: "bold" }}>Distância:</span>{" "}
            {data.levenshteinDistance ?? "Não calculado."}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography component={"span"}>
            <span style={{ fontWeight: "bold" }}>Arquivo 1:</span>{" "}
            {data.firstFile.id}
          </Typography>
          <span>{" | "}</span>
          <Typography component={"span"}>
            <span style={{ fontWeight: "bold" }}>Arquivo 2:</span>{" "}
            {data.secondFile.id}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        <SuitePageComparisonOverviewDiff />
      </DialogContent>
    </>
  )
}

export default SuitePageComparisonOverview
