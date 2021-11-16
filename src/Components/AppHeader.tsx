import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { FC, ReactNode } from "react"
import { Link } from "react-router-dom"
import { APP_CONTAINER_MAX_WIDTH } from "./AppContainer"

type IAppHeaderProps = {
  title?: string
  href?: string

  beforeTitle?: ReactNode
  afterTitle?: ReactNode
}

const AppHeader: FC<IAppHeaderProps> = ({
  title,
  href,
  beforeTitle,
  afterTitle
}) => {
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          maxWidth: APP_CONTAINER_MAX_WIDTH,
          margin: "0 auto",
          width: "100%"
        }}
      >
        {beforeTitle}

        {title && (
          <Typography sx={{ flex: 1 }} variant="h6" noWrap component="div">
            {href ? <Link to={href}>{title}</Link> : title}
          </Typography>
        )}

        {afterTitle}
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
