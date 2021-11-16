import AppHeader from "../../Components/AppHeader"
import SuitesPageHeaderNewSuite from "./SuitesPageHeaderNewSuite"
import SuitesPageHeaderUpdate from "./SuitesPageHeaderUpdate"

const SuitesPageHeader = () => {
  return (
    <AppHeader
      title={"Início"}
      afterTitle={
        <>
          <SuitesPageHeaderUpdate />
          <SuitesPageHeaderNewSuite />
        </>
      }
    />
  )
}

export default SuitesPageHeader
