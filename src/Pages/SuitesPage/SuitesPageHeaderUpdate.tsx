import RefreshIcon from "@mui/icons-material/Refresh"
import IconButton from "@mui/material/IconButton"
import { useCallback } from "react"
import { useContextSelector } from "use-context-selector"
import { SuitesPageContext } from "./SuitesPageContext"

const SuitesPageHeaderUpdate = () => {
  const refetch = useContextSelector(
    SuitesPageContext,
    ({ listQuery: { refetch } }) => refetch
  )
  const setIsBusy = useContextSelector(
    SuitesPageContext,
    ({ setIsBusy }) => setIsBusy
  )
  const isDisabled = useContextSelector(
    SuitesPageContext,
    ({ isBusy, listQuery: { isLoading } }) => isBusy || isLoading
  )

  const handleUpdate = useCallback(async () => {
    setIsBusy(true)
    try {
      await refetch()
    } catch (_) {}
    setIsBusy(false)
  }, [refetch])

  return (
    <IconButton color="inherit" disabled={isDisabled} onClick={handleUpdate}>
      <RefreshIcon />
    </IconButton>
  )
}

export default SuitesPageHeaderUpdate
