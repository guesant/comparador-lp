import RefreshIcon from "@mui/icons-material/Refresh"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import { useContextSelector } from "use-context-selector"
import { useHttp } from "../../Hooks/useHttp"
import {
  RunComparisons,
  SyncComparisons
} from "../../Services/API/APIResourceSuites"
import { SuitePageContext } from "../SuitePage/SuitePageContext"

const SuitePageComparisonsHeader = () => {
  const http = useHttp()
  const { id: suiteId } = useParams<"id">()
  const [isBusy, setIsBusy] = useState(false)

  const refetch = useContextSelector(
    SuitePageContext,
    ({ suiteQuery: { refetch } }) => refetch
  )

  const hasComparisonsInQueue = useContextSelector(
    SuitePageContext,
    ({ suiteQuery }) =>
      Boolean(suiteQuery.data?.comparisons?.some((i) => i.status === "queued"))
  )

  const handleUpdate = useCallback(async () => {
    if (isBusy) return
    setIsBusy(true)

    try {
      await SyncComparisons(http)(suiteId!)
      await refetch()
    } catch (e) {}

    setIsBusy(false)
  }, [isBusy, suiteId, refetch, http])

  const handleRunComparisons = useCallback(async () => {
    if (isBusy) return
    setIsBusy(true)

    try {
      await RunComparisons(http)(suiteId!)
      await refetch()
    } catch (e) {}

    setIsBusy(false)
  }, [isBusy, suiteId, refetch, http])

  return (
    <Box
      sx={{
        my: 3,
        gap: 1,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center"
      }}
    >
      <Typography sx={{ flex: 1 }} variant="h6">
        Comparações
      </Typography>
      <Button
        disabled={isBusy}
        variant={"outlined"}
        onClick={handleUpdate}
        startIcon={<RefreshIcon />}
      >
        Sincronizar
      </Button>
      <Button
        variant={"contained"}
        onClick={handleRunComparisons}
        disabled={!hasComparisonsInQueue || isBusy}
      >
        Executar Comparações da Fila
      </Button>
    </Box>
  )
}

export default SuitePageComparisonsHeader
