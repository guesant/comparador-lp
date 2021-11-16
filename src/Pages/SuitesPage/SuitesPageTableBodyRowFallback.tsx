import { TableCell } from "@mui/material"
import TableRow from "@mui/material/TableRow"

export const SuitesPageTableBodyRowFallbackNoContent = () => (
  <TableRow>
    <TableCell>Nenhum resultado foi encontrado.</TableCell>
  </TableRow>
)

export const SuitesPageTableBodyRowFallbackError = () => (
  <TableRow>
    <TableCell>Ocorreu um erro.</TableCell>
  </TableRow>
)

export const SuitesPageTableBodyRowFallbackLoading = () => (
  <TableRow>
    <TableCell>Carregando...</TableCell>
  </TableRow>
)
