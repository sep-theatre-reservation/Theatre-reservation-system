import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "docs", // Output directory set to 'docs'
  },
  base: "/Theatre-reservation-system/", // Set the base path to your subfolder
});
