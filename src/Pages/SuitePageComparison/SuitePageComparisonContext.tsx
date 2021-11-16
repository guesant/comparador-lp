import { FC } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { useParams } from "react-router-dom"
import { createContext } from "use-context-selector"
import { useHttp } from "../../Hooks/useHttp"
import { FindById } from "../../Services/API/APIResourceComparison"

type ISuitePageComparisonContext = {
  comparisonQuery: UseQueryResult<any>
}

export const SuitePageComparisonContext = createContext(
  {} as ISuitePageComparisonContext
)

export const SuitePageComparisonContextProvider: FC = ({ children }) => {
  const http = useHttp()
  const { comparisonId } = useParams<"comparisonId">()

  const comparisonQuery = useQuery([http, "comparison", comparisonId], () =>
    FindById(http)(comparisonId!)
  )

  return (
    <SuitePageComparisonContext.Provider value={{ comparisonQuery }}>
      {children}
    </SuitePageComparisonContext.Provider>
  )
}
