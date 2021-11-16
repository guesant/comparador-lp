import loadable from "@loadable/component"
import DeleteIcon from "@mui/icons-material/Delete"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction"
import ListItemText from "@mui/material/ListItemText"
import Paper from "@mui/material/Paper"
import { FC, useCallback, useState } from "react"
import { useContextSelector } from "use-context-selector"
import { useHttp } from "../../Hooks/useHttp"
import { Delete } from "../../Services/API/APIResourceFileGroup"
import { SuitePageContext } from "../SuitePage/SuitePageContext"

const SuiteFileGroup = loadable(() => import("./SuiteFileGroup"))

const SuiteFileGroupsListItem: FC<{ fileGroup: any }> = ({ fileGroup }) => {
  const http = useHttp()

  const refetch = useContextSelector(
    SuitePageContext,
    ({ suiteQuery }) => suiteQuery.refetch
  )

  const handleFileGroupDelete = useCallback(async () => {
    await Delete(http)(fileGroup.id)
    await refetch()
  }, [http, refetch])

  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(!open)

  return (
    <Box sx={{ mb: 0.5 }}>
      <Paper variant={"outlined"}>
        <ListItem button disableRipple onClick={handleClick}>
          <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
          <ListItemText primary={fileGroup.id} />

          <ListItemSecondaryAction>
            <IconButton onClick={handleFileGroupDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <Collapse in={open} timeout="auto">
          <SuiteFileGroup fileGroup={fileGroup} />
        </Collapse>
      </Paper>
    </Box>
  )
}

export default SuiteFileGroupsListItem
