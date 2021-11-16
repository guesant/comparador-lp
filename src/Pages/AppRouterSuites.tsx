import loadable from "@loadable/component"
import { Route, Routes } from "react-router-dom"
import { SuitePageContextProvider } from "./SuitePage/SuitePageContext"

const SuitePage = loadable(() => import("./SuitePage/SuitePage"))

const SuitesPage = loadable(() => import("./SuitesPage/SuitesPage"))

const AppRouterSuites = () => (
  <Routes>
    <Route
      path=":id/*"
      element={
        <SuitePageContextProvider>
          <Routes>
            <Route path="*" element={<SuitePage />} />
          </Routes>
        </SuitePageContextProvider>
      }
    />
    <Route path="" element={<SuitesPage />} />
  </Routes>
)

export default AppRouterSuites
