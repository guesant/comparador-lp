import SuitePageComparisonContent from "./SuitePageComparisonContent"
import { SuitePageComparisonContextProvider } from "./SuitePageComparisonContext"

const SuitePageComparison = () => (
  <SuitePageComparisonContextProvider>
    <SuitePageComparisonContent />
  </SuitePageComparisonContextProvider>
)

export default SuitePageComparison
