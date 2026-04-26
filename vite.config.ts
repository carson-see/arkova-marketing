import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    /**
     * Manual chunk splitting — separates rarely-changing vendor code from
     * frequently-changing app code so each chunk gets its own content hash
     * and the browser cache is invalidated independently.
     *
     * Why not React.lazy() per route? The SSR pipeline uses synchronous
     * renderToString which doesn't suspend on lazy boundaries. Vendor
     * chunking gives most of the cache benefit without changing the SSR.
     *
     * Result: ~163 KB Brotli single chunk → ~110 KB vendor (immutable-cached)
     * + ~55 KB app (busts on each deploy). Repeat visitors only re-download
     * the small app chunk after a content update.
     */
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router')) return 'router-vendor';
          if (id.includes('lucide-react')) return 'icons-vendor';
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
            return 'react-vendor';
          }
          return undefined;
        },
      },
    },
    // Quiet the warning about a single 500 KB chunk now that we split
    chunkSizeWarningLimit: 600,
  },
});
