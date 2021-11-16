import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CircularProgress variant={"indeterminate"} />
    </Box>
  )
}

export default Loading
