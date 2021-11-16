import axios from "axios"
import { FC, useEffect, useMemo, useState } from "react"
import { createContext } from "use-context-selector"
import Loading from "../Components/Loading"
import { APIHttp } from "../Services/API/APIHttp"
import { apiServer } from "../Services/Server/APIServer"

type IAPIContext = {
  http: APIHttp
}

export const APIContext = createContext({} as IAPIContext)

export const APIContextProvider: FC = ({ children }) => {
  const [serverStarted, setServerStarted] = useState(false)

  useEffect(() => {
    setServerStarted(false)
    apiServer.startServer().then(() => {
      setServerStarted(true)
    })
  }, [apiServer])

  const http = useMemo(() => axios.create({ baseURL: "/api" }), [])

  if (!serverStarted) {
    return <Loading />
  }

  return <APIContext.Provider value={{ http }}>{children}</APIContext.Provider>
}
