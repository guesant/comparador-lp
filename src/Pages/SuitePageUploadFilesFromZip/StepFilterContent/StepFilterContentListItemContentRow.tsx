import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import { Fragment, useCallback, useMemo } from "react"
import { ListChildComponentProps } from "react-window"
import { useContextSelector } from "use-context-selector"
import { StepFilterContentListItemContext } from "./StepFilterContentListItemContext"

const useChecked = (filename: string) => {
  const sliceList = useContextSelector(
    StepFilterContentListItemContext,
    ({ selectedFile: { sliceList } }) => sliceList
  )

  const patchSelectedFile = useContextSelector(
    StepFilterContentListItemContext,
    ({ patchSelectedFile }) => patchSelectedFile
  )

  const isChecked = useMemo(
    () => sliceList.includes(filename),
    [filename, sliceList]
  )

  const handleToggle = useCallback(() => {
    patchSelectedFile((selectedFile) => {
      if (selectedFile.sliceList.includes(filename)) {
        selectedFile.sliceList = selectedFile.sliceList.filter(
          (i) => i !== filename
        )
      } else {
        selectedFile.sliceList.push(filename)
      }
    })
  }, [filename, patchSelectedFile])

  return { isChecked, handleToggle }
}

export const StepFilterContentListItemContentRow = ({
  index,
  style,
  data
}: ListChildComponentProps<{ filename: string }[]>) => {
  const { filename } = useMemo(() => data[index], [data, index])
  const { isChecked, handleToggle } = useChecked(filename)

  return (
    <div style={style}>
      <Fragment>
        <ListItem onClick={handleToggle} button>
          <ListItemIcon>
            <Checkbox checked={isChecked} disableRipple edge="start" />
          </ListItemIcon>
          <ListItemText>
            <Typography noWrap>{filename}</Typography>
          </ListItemText>
        </ListItem>
        <Divider />
      </Fragment>
    </div>
  )
}
