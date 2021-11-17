import SuitePageUploadFilesFromZipContent from "./SuitePageUploadFilesFromZipContent"
import { SuitePageUploadFilesFromZipContextProvider } from "./SuitePageUploadFilesFromZipContext"

const SuitePageUploadFilesFromZip = () => (
  <SuitePageUploadFilesFromZipContextProvider>
    <SuitePageUploadFilesFromZipContent />
  </SuitePageUploadFilesFromZipContextProvider>
)

export default SuitePageUploadFilesFromZip
