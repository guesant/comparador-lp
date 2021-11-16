import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Paper from "@mui/material/Paper"
import { useContextSelector } from "use-context-selector"
import { SuitePageContext } from "../SuitePage/SuitePageContext"
import SuiteFileGroupsListItem from "./SuiteFileGroupsListItem"

const SuiteFileGroupsList = () => {
  const fileGroups = useContextSelector(
    SuitePageContext,
    ({ suiteQuery }) => suiteQuery?.data?.fileGroups || []
  )

  return (
    <Box sx={{ my: 2 }}>
      <List>
        {fileGroups.map((fileGroup) => (
          <SuiteFileGroupsListItem fileGroup={fileGroup} key={fileGroup.id} />
        ))}
        {fileGroups.length === 0 && (
          <Paper variant={"outlined"}>
            <ListItem>Nenhum resultado foi encontrado.</ListItem>
          </Paper>
        )}
      </List>
    </Box>
  )
}

export default SuiteFileGroupsList
