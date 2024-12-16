import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Yerel IP'yi kullanarak erişim sağlar
    port: 5173, // Varsayılan port, istersen değiştirebilirsin
  },
})
