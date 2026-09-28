import { readFileSync } from 'node:fs'
import fm from 'front-matter'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    }
  },
  build: {
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'markdown': ['react-markdown', 'remark-gfm'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        pure_funcs: ['console.log', 'console.debug'],
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@heroicons/react'],
  },
  plugins: [
    {
      name: 'exclude-draft-content',
      enforce: 'pre',
      load(id) {
        if (id.includes('/src/content/') && id.endsWith('.md?raw')) {
          const raw = readFileSync(id.slice(0, -4), 'utf8')
          const { attributes } = fm<{ draft?: boolean }>(raw)
          return 'export default ' + JSON.stringify(attributes.draft === true ? '' : raw)
        }
      },
    },
    react(),
    tsconfigPaths()
  ],
})
