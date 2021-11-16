import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import AppRouterSuites from "./AppRouterSuites"

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/suites/*" element={<AppRouterSuites />} />
      <Route path="*" element={<Navigate to="/suites" />} />
    </Routes>
  </Router>
)
