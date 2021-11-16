import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import IconButton from "@mui/material/IconButton"
import { Link } from "react-router-dom"
import AppHeader from "../../Components/AppHeader"

const SuitePageHeader = () => (
  <AppHeader
    title="Suite"
    beforeTitle={
      <>
        <Link to="./..">
          <IconButton color="inherit">
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </>
    }
  />
)

export default SuitePageHeader
