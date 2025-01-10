import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],


  server: {
    proxy: {
      '/api/v1': 'http://localhost:8000',  // Перенаправление запросов на локальный сервер
    },
  },

  define: {
    'process.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
  },
});
