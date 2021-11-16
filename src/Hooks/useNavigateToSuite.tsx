import { useCallback } from "react"
import { useNavigate } from "react-router"

export const useNavigateToSuite = () => {
  const navigate = useNavigate()

  const navigateToSuite = useCallback(
    (suiteId: string) => {
      navigate("/suites/" + suiteId)
    },
    [navigate]
  )

  return navigateToSuite
}
