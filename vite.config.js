import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function preconnectMedia(mediaUrl) {
  return {
    name: 'preconnect-media',
    transformIndexHtml() {
      if (!mediaUrl) return []
      return [
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: mediaUrl, crossorigin: '' },
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const mediaUrl = (env.VITE_MEDIA_URL || '').replace(/\/+$/u, '')

  return {
    plugins: [react(), tailwindcss(), preconnectMedia(mediaUrl)],
    server: {
      host: true,
    },
    preview: {
      host: true,
    },
  }
})
