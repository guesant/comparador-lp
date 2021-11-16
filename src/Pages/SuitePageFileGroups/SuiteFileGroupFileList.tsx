import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { FC } from "react"
import { SuiteFileGroupFileListItem } from "./SuiteFileGroupFileListItem"

const SuiteFileGroupFileList: FC<{ fileGroup: any }> = ({ fileGroup }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Arquivo</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fileGroup.files.map((file) => (
            <SuiteFileGroupFileListItem key={file.id} file={file} />
          ))}
          {fileGroup.files.length === 0 && (
            <TableRow>
              <TableCell component="th" scope="row">
                Nenhum resultado foi encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SuiteFileGroupFileList
