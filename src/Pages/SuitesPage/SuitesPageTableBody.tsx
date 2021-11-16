import TableBody from "@mui/material/TableBody"
import { useContextSelector } from "use-context-selector"
import { SuitesPageContext } from "./SuitesPageContext"
import SuitesPageTableBodyRow from "./SuitesPageTableBodyRow"
import {
  SuitesPageTableBodyRowFallbackError,
  SuitesPageTableBodyRowFallbackLoading,
  SuitesPageTableBodyRowFallbackNoContent
} from "./SuitesPageTableBodyRowFallback"

const SuitesPageTableBody = () => {
  const data = useContextSelector(
    SuitesPageContext,
    ({ listQuery }) => listQuery?.data || []
  )

  const isLoading = useContextSelector(
    SuitesPageContext,
    ({ listQuery }) => listQuery?.isLoading
  )

  const isError = useContextSelector(
    SuitesPageContext,
    ({ listQuery }) => listQuery?.isError
  )

  return (
    <TableBody>
      {isError && <SuitesPageTableBodyRowFallbackError />}
      {isLoading && <SuitesPageTableBodyRowFallbackLoading />}

      {!(isLoading || isError) && (
        <>
          {data.map((row) => (
            <SuitesPageTableBodyRow key={row.id} row={row} />
          ))}

          {data.length === 0 && <SuitesPageTableBodyRowFallbackNoContent />}
        </>
      )}
    </TableBody>
  )
}

export default SuitesPageTableBody
