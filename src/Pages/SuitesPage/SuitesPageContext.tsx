import { Dispatch, FC, SetStateAction, useState } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { createContext, useContextSelector } from "use-context-selector"
import { APIContext } from "../../Hooks/APIContext"
import { List } from "../../Services/API/APIResourceSuites"

type ISuitesContext = {
  listQuery: UseQueryResult<any[]>
  isBusy: boolean
  setIsBusy: Dispatch<SetStateAction<boolean>>
}

export const SuitesPageContext = createContext({} as ISuitesContext)

export const SuitesPageContextProvider: FC = ({ children }) => {
  const http = useContextSelector(APIContext, ({ http }) => http)
  const listQuery = useQuery([http, "suites.list"], () => List(http)())

  const [isBusy, setIsBusy] = useState(false)

  return (
    <SuitesPageContext.Provider value={{ listQuery, isBusy, setIsBusy }}>
      {children}
    </SuitesPageContext.Provider>
  )
}
