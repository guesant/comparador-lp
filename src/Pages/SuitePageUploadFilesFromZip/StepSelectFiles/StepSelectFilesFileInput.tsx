import Button from "@mui/material/Button"
import { useContextSelector } from "use-context-selector"
import { SuitePageUploadFilesFromZipContext } from "../SuitePageUploadFilesFromZipContext"

const StepSelectFilesFileInput = () => {
  const appendSelectedFiles = useContextSelector(
    SuitePageUploadFilesFromZipContext,
    ({ appendSelectedFiles }) => appendSelectedFiles
  )

  return (
    <div>
      <label>
        <input
          hidden
          multiple
          type="file"
          onChange={(e) => appendSelectedFiles(e.target.files)}
        />
        <Button variant={"contained"} component={"div"}>
          Selecionar Arquivos
        </Button>
      </label>
    </div>
  )
}
export default StepSelectFilesFileInput
