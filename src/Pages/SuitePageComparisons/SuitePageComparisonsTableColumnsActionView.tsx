import PreviewIcon from "@mui/icons-material/Preview"
import { GridActionsCellItem, GridRowParams } from "@mui/x-data-grid"
import { FC, useCallback } from "react"
import { useNavigate } from "react-router"

const SuitePageComparisonsTableColumnsActionView: FC<{
  params: GridRowParams
}> = ({ params }) => {
  const navigate = useNavigate()

  const handleViewClick = useCallback(() => {
    navigate(`${params.id}`)
  }, [navigate, params.id])

  return (
    <GridActionsCellItem
      key={0}
      label="Ver"
      icon={<PreviewIcon />}
      onClick={handleViewClick}
    />
  )
}

export default SuitePageComparisonsTableColumnsActionView
