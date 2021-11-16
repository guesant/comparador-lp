import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import SuitesPageTableBody from "./SuitesPageTableBody"

const SuitesPageTable = () => (
  <Paper>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Suite</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <SuitesPageTableBody />
      </Table>
    </TableContainer>
  </Paper>
)

export default SuitesPageTable
