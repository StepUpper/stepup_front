import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths(), svgr()],
  base: "/stepup_front",
  esbuild: {
    drop: ["debugger"],
    pure: mode === "production" ? ["console.log"] : [],
  },
}));
