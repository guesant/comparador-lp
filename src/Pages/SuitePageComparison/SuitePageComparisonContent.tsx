import Dialog from "@mui/material/Dialog"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useContextSelector } from "use-context-selector"
import {
  SuitePageComparisonContentFallbackError,
  SuitePageComparisonContentFallbackLoading
} from "./SuitePageComparisonContentFallback"
import SuitePageComparisonContentHeader from "./SuitePageComparisonContentHeader"
import { SuitePageComparisonContext } from "./SuitePageComparisonContext"
import SuitePageComparisonOverview from "./SuitePageComparisonOverview"

const SuitePageComparisonContent = () => {
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    navigate("./..")
  }, [navigate])

  const isLoading = useContextSelector(
    SuitePageComparisonContext,
    ({ comparisonQuery: { isLoading } }) => isLoading
  )
  const isError = useContextSelector(
    SuitePageComparisonContext,
    ({ comparisonQuery: { isError } }) => isError
  )

  return (
    <>
      <Dialog
        fullScreen
        open={true}
        maxWidth={"xl"}
        fullWidth={true}
        onClose={handleClose}
      >
        <SuitePageComparisonContentHeader handleClose={handleClose} />
        {isLoading && <SuitePageComparisonContentFallbackLoading />}
        {isError && <SuitePageComparisonContentFallbackError />}
        {!isLoading && !isError && <SuitePageComparisonOverview />}
      </Dialog>
    </>
  )
}

export default SuitePageComparisonContent
