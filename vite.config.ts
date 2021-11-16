import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/

const PROJECT_INFO = {
  GITHUB: "https://github.com/guesant/comparador-lp"
}

export default defineConfig({
  plugins: [react()],
  define: {
    "window.PROJECT_INFO.GITHUB": JSON.stringify(PROJECT_INFO.GITHUB)
  }
})
