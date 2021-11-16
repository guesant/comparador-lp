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

const SuitePageComparisons = loadable(
  () => import("./SuitePageComparisons/SuitePageComparisons")
)

/* eslint-disable no-unused-vars */
enum PageContentResource {
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
          <Tab label="Comparações" value={PageContentResource.Comparisons} />
        </Tabs>
      </Box>
      <AppContent>
        <Routes>
          <Route
            path={`${PageContentResource.Comparisons}/*`}
            element={<SuitePageComparisons />}
          />
        </Routes>
      </AppContent>
    </>
  )
}

export default AppRouterSuite
