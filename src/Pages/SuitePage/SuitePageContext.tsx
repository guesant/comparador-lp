import { FC } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { useParams } from "react-router-dom"
import { createContext, useContextSelector } from "use-context-selector"
import { APIContext } from "../../Hooks/APIContext"
import {
  ListComparisons,
  ListFileGroups
} from "../../Services/API/APIResourceSuites"

type ISuiteContext = {
  suiteQuery: UseQueryResult<{ fileGroups: any[]; comparisons: any[] }>
}

export const SuitePageContext = createContext({} as ISuiteContext)

export const SuitePageContextProvider: FC = ({ children }) => {
  const params = useParams<"id">()
  const http = useContextSelector(APIContext, ({ http }) => http)

  const id = params.id!

  const suiteQuery = useQuery([http, "suite", id], async () => {
    const fileGroupsPromise = ListFileGroups(http)(id)
    const comparisonsPromise = ListComparisons(http)(id)

    return {
      fileGroups: await fileGroupsPromise,
      comparisons: await comparisonsPromise
    }
  })

  return (
    <SuitePageContext.Provider value={{ suiteQuery }}>
      {children}
    </SuitePageContext.Provider>
  )
}
