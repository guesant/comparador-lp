import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { FC, useCallback } from "react"
import { useContextSelector } from "use-context-selector"
import { useHttp } from "../../Hooks/useHttp"
import { useNavigateToSuite } from "../../Hooks/useNavigateToSuite"
import { Delete } from "../../Services/API/APIResourceSuites"
import { SuitesPageContext } from "./SuitesPageContext"

const SuitesPageTableBodyRow: FC<{ row: any }> = ({ row }) => {
  const http = useHttp()
  const navigateToSuite = useNavigateToSuite()

  const refetch = useContextSelector(
    SuitesPageContext,
    ({ listQuery: { refetch } }) => refetch
  )

  const isDisabled = useContextSelector(
    SuitesPageContext,
    ({ isBusy, listQuery: { isLoading, isError } }) =>
      isBusy || isLoading || isError
  )

  const setIsBusy = useContextSelector(
    SuitesPageContext,
    ({ setIsBusy }) => setIsBusy
  )

  const handleDelete = useCallback(async () => {
    setIsBusy(true)
    try {
      await Delete(http)(row.id)
      await refetch()
    } catch (_) {}
    setIsBusy(false)
  }, [refetch, row.id])

  return (
    <TableRow
      style={{ cursor: "pointer" }}
      onClick={() => navigateToSuite(row.id)}
    >
      <TableCell component="th" scope="row">
        <Typography noWrap>{row.id}</Typography>
      </TableCell>
      <TableCell
        scope="row"
        component="th"
        onClick={(e) => e.stopPropagation()}
      >
        <Typography noWrap>
          <IconButton disabled={isDisabled} onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default SuitesPageTableBodyRow
