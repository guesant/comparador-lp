import { useContextSelector } from "use-context-selector"
import { StepFilterContentArchiveListItemContext } from "./StepFilterContentArchiveListItemContext"

const StepFilterContentArchiveListItemName = () => {
  const name = useContextSelector(
    StepFilterContentArchiveListItemContext,
    ({ selectedFile }) => selectedFile.file.name
  )
  return <>{name}</>
}

export default StepFilterContentArchiveListItemName
