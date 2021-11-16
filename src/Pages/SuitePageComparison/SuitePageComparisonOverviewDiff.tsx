import { DiffEditor } from "@monaco-editor/react"
import { useQuery } from "react-query"
import { useContextSelector } from "use-context-selector"
import { useHttp } from "../../Hooks/useHttp"
import { GetData } from "../../Services/API/APIResourceFile"
import { SuitePageComparisonContext } from "./SuitePageComparisonContext"

const SuitePageComparisonOverviewDiff = () => {
  const http = useHttp()

  const data = useContextSelector(
    SuitePageComparisonContext,
    ({ comparisonQuery }) => comparisonQuery.data
  )

  const firstFileQuery = useQuery(
    [http, "file", data?.firstFile?.id],
    async () => {
      return data ? GetData(http)(data.firstFile.id) : null
    }
  )

  const secondFileQuery = useQuery(
    [http, "file", data?.secondFile?.id],
    async () => {
      return data ? GetData(http)(data.secondFile.id) : null
    }
  )

  return (
    <>
      <DiffEditor
        height="75vh"
        theme={"vs-dark"}
        original={firstFileQuery.data ?? "Carregando.."}
        modified={secondFileQuery.data ?? "Carregando.."}
        options={{ readOnly: true }}
      />
    </>
  )
}

export default SuitePageComparisonOverviewDiff
