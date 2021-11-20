import AppRouterSuite from "../AppRouterSuite"
import SuitePageFallbacks from "./SuitePageFallbacks"
import SuitePageHeader from "./SuitePageHeader"

const SuitePage = () => (
  <div>
    <SuitePageHeader />
    <SuitePageFallbacks>
      <AppRouterSuite />
    </SuitePageFallbacks>
  </div>
)

export default SuitePage
