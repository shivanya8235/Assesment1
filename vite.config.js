// Source - https://stackoverflow.com/a/79627779
// Posted by bayajida Moubarak
// Retrieved 2026-02-25, License - CC BY-SA 4.0

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; //add this line from tailwindcss
export default defineConfig({
  plugins: [
    tailwindcss(), // along with this line
    react(),
  ],
});
