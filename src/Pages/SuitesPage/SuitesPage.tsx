import SuitesPageContent from "./SuitesPageContent"
import { SuitesPageContextProvider } from "./SuitesPageContext"
import SuitesPageHeader from "./SuitesPageHeader"

const SuitesPage = () => (
  <SuitesPageContextProvider>
    <SuitesPageHeader />
    <SuitesPageContent />
  </SuitesPageContextProvider>
)

export default SuitesPage
