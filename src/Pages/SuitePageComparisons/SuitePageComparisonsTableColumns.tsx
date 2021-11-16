import { GridColDef, GridRowParams } from "@mui/x-data-grid"
import SuitePageComparisonsTableColumnsActionView from "./SuitePageComparisonsTableColumnsActionView"

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
  },

  {
    field: "actions",
    headerName: "Ações",
    type: "actions",
    getActions: (params: GridRowParams) => [
      <SuitePageComparisonsTableColumnsActionView params={params} key={0} />
    ]
  } as any
]

export default SuitePageComparisonsTableColumns
