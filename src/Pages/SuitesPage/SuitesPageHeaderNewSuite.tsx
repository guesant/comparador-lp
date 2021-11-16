import Button from "@mui/material/Button"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useContextSelector } from "use-context-selector"
import { APIContext } from "../../Hooks/APIContext"
import { Create } from "../../Services/API/APIResourceSuites"
import { SuitesPageContext } from "./SuitesPageContext"

const SuitesPageHeaderNewSuite = () => {
  const navigate = useNavigate()

  const http = useContextSelector(APIContext, ({ http }) => http)

  const setIsBusy = useContextSelector(
    SuitesPageContext,
    ({ setIsBusy }) => setIsBusy
  )

  const isDisabled = useContextSelector(
    SuitesPageContext,
    ({ isBusy, listQuery: { isLoading, isError } }) =>
      isBusy || isLoading || isError
  )

  const handleCreateSuite = useCallback(async () => {
    setIsBusy(true)
    try {
      const suite = await Create(http)()
      navigate(`/suites/${suite.id}`)
    } catch (_) {}
    setIsBusy(false)
  }, [http, navigate])

  return (
    <Button
      color="inherit"
      variant="outlined"
      disabled={isDisabled}
      onClick={handleCreateSuite}
    >
      Nova Suite
    </Button>
  )
}

export default SuitesPageHeaderNewSuite
