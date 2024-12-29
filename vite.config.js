import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Expose only specific environment variables
const exposedEnv = {
  VITE_SUPABASE_URL: JSON.stringify(process.env.VITE_SUPABASE_URL),
  VITE_SUPABASE_KEY: JSON.stringify(process.env.VITE_SUPABASE_KEY),
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      stream: 'stream-browserify', // Optional: Alias for specific Node.js packages
      util: 'util',               // Alias for utilities used in browser
    },
  },
  define: {
    global: 'globalThis', // Use `globalThis` to mimic `global` in browsers
    'process.env': {}, // Define process.env as an empty object to avoid errors
    'import.meta.env': exposedEnv, // Only expose specific environment variables
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Ensure `global` is correctly defined for esbuild
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true, // Polyfill `process`
          buffer: true,  // Polyfill `Buffer` if required
        }),
        NodeModulesPolyfillPlugin(), // Polyfill Node.js modules
      ],
    },
  },
});
