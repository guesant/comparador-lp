import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { QueryClient, QueryClientProvider } from "react-query"
import "./App.css"
import AppContent from "./Components/AppContent"
import { APIContextProvider } from "./Hooks/APIContext"
import { AppRouter } from "./Pages/AppRouter"

const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 0 } }
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
            userSelect: "none",
            alignItems: "center"
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography>Criado por Gabriel R. Antunes</Typography>
          </Box>
          <Box sx={{ width: 36, height: 36 }}>
            <img
              alt="Feito em Ji-Paraná, RO."
              title="Feito em Ji-Paraná, RO."
              src="https://raw.githubusercontent.com/guesant/assets/shared/jiparana-bg-white.svg"
            />
          </Box>
          <a href={process.env.PROJECT_INFO_GITHUB}>
            <Box sx={{ width: 26, height: 26 }}>
              <img
                alt="Repositório GitHub"
                title="Repositório GitHub"
                src="https://simpleicons.org/icons/github.svg"
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
