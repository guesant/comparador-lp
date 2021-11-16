import { useContextSelector } from "use-context-selector"
import { APIContext } from "./APIContext"

export const useHttp = () => {
  return useContextSelector(APIContext, ({ http }) => http)
}
