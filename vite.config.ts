import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          plotly: ['plotly.js/lib/core', 'plotly.js/lib/scatterpolar'],
          echarts: ['echarts/core', 'echarts/charts', 'echarts/components', 'echarts/renderers'],
        },
      },
    },
  },
})
