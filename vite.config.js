import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["3bc9-181-104-25-122.ngrok-free.app", "7bfa69ddf234.ngrok-free.app"],
    headers: {
      "Content-Security-Policy": "script-src 'self' 'unsafe-inline' accounts.scdn.co;"
    }
  },
  plugins: [react(), tailwindcss()],
  
});
