import Button from "@mui/material/Button"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { FC, useCallback } from "react"
import { useContextSelector } from "use-context-selector"
import { useHttp } from "../../Hooks/useHttp"
import { Delete } from "../../Services/API/APIResourceFile"
import { SuitePageContext } from "../SuitePage/SuitePageContext"

export const SuiteFileGroupFileListItem: FC<{ file: any }> = ({ file }) => {
  const http = useHttp()
  const refetch = useContextSelector(
    SuitePageContext,
    ({ suiteQuery: { refetch } }) => refetch
  )

  const handleDelete = useCallback(async () => {
    await Delete(http)(file.id)
    await refetch()
  }, [http, file.id, refetch])

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        {file.filename}
      </TableCell>
      <TableCell
        scope="row"
        component="th"
        sx={{ display: "flex", gap: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button onClick={handleDelete} color={"error"}>
          Deletar
        </Button>
      </TableCell>
    </TableRow>
  )
}
