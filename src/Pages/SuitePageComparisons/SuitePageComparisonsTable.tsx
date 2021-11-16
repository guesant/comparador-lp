import { DataGrid } from "@mui/x-data-grid"
import { useContextSelector } from "use-context-selector"
import { SuitePageContext } from "../SuitePage/SuitePageContext"
import SuitePageComparisonsTableColumns from "./SuitePageComparisonsTableColumns"

const SuitePageComparisonsTable = () => {
  const { isLoading, isError } = useContextSelector(
    SuitePageContext,
    ({ suiteQuery: { isLoading, isError } }) => ({ isLoading, isError })
  )
  const comparisons = useContextSelector(
    SuitePageContext,
    ({ suiteQuery }) => suiteQuery.data?.comparisons || []
  )

  return (
    <>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          rows={comparisons}
          loading={isLoading}
          disableSelectionOnClick
          columns={SuitePageComparisonsTableColumns}
          {...{ ...(isError ? { error: true } : {}) }}
        />
      </div>
    </>
  )
}

export default SuitePageComparisonsTable
