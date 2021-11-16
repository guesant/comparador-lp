import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { QueryClient, QueryClientProvider } from "react-query"
import "./App.css"
import { AppRouter } from "./Pages/AppRouter"
import { APIContextProvider } from "./Components/APIContext"
import AppContent from "./Components/AppContent"

const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

const App = () => (
  <>
    <CssBaseline />
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column"
      }}
    >
      <Box sx={{ overflow: "auto", flex: 1 }}>
        <QueryClientProvider client={client}>
          <APIContextProvider>
            <AppRouter />
          </APIContextProvider>
        </QueryClientProvider>
      </Box>

      <Divider />

      <AppContent>
        <Box
          sx={{
            gap: 1,
            my: 1.25,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography>Criado por Gabriel R. Antunes</Typography>
          </Box>
          <a href={(window as any).PROJECT_INFO.GITHUB}>
            <Box sx={{ width: 24, height: 24 }}>
              <img
                src="https://simpleicons.org/icons/github.svg"
                alt="Repositório GitHub"
              />
            </Box>
          </a>
        </Box>
      </AppContent>
      <Divider />
    </Box>
  </>
)

export default App
