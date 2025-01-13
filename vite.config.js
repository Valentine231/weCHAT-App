import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import process from 'process'; // Explicitly import process for runtime polyfill

export default ({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return defineConfig({
    server: {
      hmr: {
        host: 'localhost',
        port: 5173, // Match your development environment
        protocol: 'ws', // Use 'wss' for secure connections
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        stream: 'stream-browserify',
        util: 'util',
        process: 'process/browser', // Explicit alias for process
      },
    },
    define: {
      global: 'globalThis', // Ensure global is defined for browser
      'process.env': {}, // Provide a safe fallback for undefined process.env
      'import.meta.env': {
        VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL),
        VITE_SUPABASE_KEY: JSON.stringify(env.VITE_SUPABASE_KEY),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis', // Define globalThis for esbuild
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true, // Include Buffer polyfill if needed
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined, // Customize chunk splitting if needed
        },
      },
    },
  });
};
