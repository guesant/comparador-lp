import loadable from "@loadable/component"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router"
import {
  matchPath,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams
} from "react-router-dom"
import AppContent from "../Components/AppContent"

const SuitePageFileGroups = loadable(
  () => import("./SuitePageFileGroups/SuiteFileGroups")
)

const SuitePageUploadFiles = loadable(
  () => import("./SuitePageUploadFiles/SuitePageUploadFiles")
)

const SuitePageUploadFilesFromZip = loadable(
  () => import("./SuitePageUploadFilesFromZip/SuitePageUploadFilesFromZip")
)

const SuitePageComparison = loadable(
  () => import("./SuitePageComparison/SuitePageComparison")
)

const SuitePageComparisons = loadable(
  () => import("./SuitePageComparisons/SuitePageComparisons")
)

/* eslint-disable no-unused-vars */
enum PageContentResource {
  Files = "files",
  Comparisons = "comparisons"
}

/* eslint-enable no-unused-vars */

const useTabs = () => {
  const { id: suiteId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const currentTab = useMemo(
    () => matchPath("/suites/:id/:resource/*", location.pathname),
    [location.pathname]
  )

  const currentTabPath = useMemo(() => {
    return currentTab?.params.resource ?? PageContentResource.Files
  }, [currentTab])

  const exactMatch = useMemo(
    () => currentTab?.params["*"]?.trim().length === 0,
    [currentTab]
  )

  const changeTab = useCallback(
    (resource: PageContentResource) => {
      if (resource !== currentTabPath || !exactMatch) {
        navigate(`/suites/${suiteId}/${resource}`)
      }
    },
    [exactMatch, navigate, currentTabPath]
  )

  return { changeTab, currentTabPath }
}

const AppRouterSuite = () => {
  const { changeTab, currentTabPath } = useTabs()
  return (
    <>
      <Box sx={{ borderBottom: 1, borderTop: 1, borderColor: "divider" }}>
        <Tabs
          centered
          value={currentTabPath}
          onChange={(_, resource: PageContentResource) => changeTab(resource)}
        >
          <Tab label="Arquivos" value={PageContentResource.Files} />
          <Tab label="Comparações" value={PageContentResource.Comparisons} />
        </Tabs>
      </Box>
      <AppContent>
        <Routes>
          <Route
            path={`${PageContentResource.Files}/upload`}
            element={<SuitePageUploadFiles />}
          />
          <Route
            path={`${PageContentResource.Files}/upload-zip`}
            element={<SuitePageUploadFilesFromZip />}
          />
          <Route
            path={`${PageContentResource.Comparisons}/:comparisonId`}
            element={<SuitePageComparison />}
          />
        </Routes>

        <Routes>
          <Route
            path={`${PageContentResource.Files}/*`}
            element={<SuitePageFileGroups />}
          />
          <Route
            path={`${PageContentResource.Comparisons}/*`}
            element={<SuitePageComparisons />}
          />
          <Route
            path="*"
            element={<Navigate to={PageContentResource.Files} />}
          />
        </Routes>
      </AppContent>
    </>
  )
}

export default AppRouterSuite
