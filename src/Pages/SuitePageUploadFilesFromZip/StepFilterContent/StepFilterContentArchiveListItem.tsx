import Divider from "@mui/material/Divider"
import ListSubheader from "@mui/material/ListSubheader"
import Paper from "@mui/material/Paper"
import StepFilterContentArchiveListItemContent from "./StepFilterContentArchiveListItemContent"
import StepFilterContentArchiveListItemName from "./StepFilterContentArchiveListItemName"

const StepFilterContentArchiveListItem = () => {
  return (
    <>
      <Paper variant={"outlined"}>
        <ListSubheader>
          <StepFilterContentArchiveListItemName />
        </ListSubheader>
        <Divider />
        <StepFilterContentArchiveListItemContent />
      </Paper>
    </>
  )
}

export default StepFilterContentArchiveListItem
