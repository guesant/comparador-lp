import { GridColDef, GridRowParams } from "@mui/x-data-grid"

const SuitePageComparisonsTableColumns: GridColDef[] = [
  { field: "id", headerName: "Comparação", width: 200 },

  {
    field: "firstFileId",
    headerName: "Arquivo 1",
    width: 130,
    valueGetter: ({ row }) => row.firstFile.id
  },
  {
    field: "secondFileId",
    headerName: "Arquivo 2",
    width: 130,
    valueGetter: ({ row }) => row.secondFile.id
  },

  { field: "status", headerName: "Status", width: 75, align: "left" },

  {
    field: "levenshteinDistance",
    headerName: "Distância",
    width: 105,
    type: "number"
  }
]

export default SuitePageComparisonsTableColumns
