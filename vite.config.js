import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
        hmr: {
            host: '10.244.60.175' 
        }
    },
    base: '/PatientManagerDemo/',
})