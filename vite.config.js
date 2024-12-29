import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Expose only specific environment variables
const exposedEnv = {
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_KEY: process.env.VITE_SUPABASE_KEY,
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': JSON.stringify({ NODE_ENV: process.env.NODE_ENV || 'development' }), // Avoid exposing all variables; set to empty or only used by polyfills
    'import.meta.env': JSON.stringify(exposedEnv), // Expose only selected variables
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
