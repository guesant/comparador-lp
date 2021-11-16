import loadable from "@loadable/component"
import { Route, Routes } from "react-router-dom"
import { SuitePageContextProvider } from "./SuitePage/SuitePageContext"

const SuitesPage = loadable(() => import("./SuitesPage/SuitesPage"))

const AppRouterSuites = () => (
  <Routes>
    <Route path="" element={<SuitesPage />} />
  </Routes>
)

export default AppRouterSuites
