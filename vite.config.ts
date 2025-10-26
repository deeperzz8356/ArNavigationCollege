import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    host: true, // This will expose the server to your local network
    https: true, // Enable HTTPS
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
