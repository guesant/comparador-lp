import { Box } from "@mui/system"
import { FC, ReactNode } from "react"
import { useContextSelector } from "use-context-selector"
import AppContent from "../../Components/AppContent"
import Loading from "../../Components/Loading"
import { SuitePageContext } from "./SuitePageContext"

const SuitePageFallbacks: FC = ({ children }) => {
  const isError = useContextSelector(
    SuitePageContext,
    ({ suiteQuery }) => suiteQuery.isError
  )

  const isLoading = useContextSelector(
    SuitePageContext,
    ({ suiteQuery }) => suiteQuery.isLoading
  )

  const hasFoundSuite = useContextSelector(SuitePageContext, ({ suiteQuery }) =>
    Boolean(suiteQuery.data)
  )

  if (isLoading || isError || !hasFoundSuite) {
    let fallbackElement: ReactNode = null

    if (isLoading) {
      fallbackElement = <Loading />
    } else if (isError) {
      fallbackElement = <Box>Ocorreu um erro.</Box>
    } else if (!hasFoundSuite) {
      fallbackElement = <Box>Suite não encontrada.</Box>
    }

    return (
      <AppContent>
        <Box sx={{ my: 3 }}>{fallbackElement}</Box>
      </AppContent>
    )
  }

  return <>{children}</>
}

export default SuitePageFallbacks
