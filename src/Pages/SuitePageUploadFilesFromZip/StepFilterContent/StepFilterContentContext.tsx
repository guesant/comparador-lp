import micromatch from "micromatch"
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react"
import { createContext } from "use-context-selector"

type IStepFilterContentContext = {
  filterText: string
  setFilterText: Dispatch<SetStateAction<string>>

  match: (arr: string[]) => string[]
  isMatch: (value: string) => boolean
}

export const StepFilterContentContext = createContext(
  {} as IStepFilterContentContext
)

export const StepFilterContentContextProvider: FC = ({ children }) => {
  const [filterText, setFilterText] = useState("")

  const match = useCallback(
    (arr: string[]) =>
      filterText.length > 0 ? micromatch(arr, filterText) : arr,
    [filterText]
  )

  const isMatch = useCallback(
    (value: string) =>
      filterText.length > 0 ? micromatch.isMatch(value, filterText) : true,
    [filterText]
  )

  return (
    <StepFilterContentContext.Provider
      value={{ filterText, setFilterText, isMatch, match }}
    >
      {children}
    </StepFilterContentContext.Provider>
  )
}
