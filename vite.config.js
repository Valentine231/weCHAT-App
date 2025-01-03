import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return defineConfig({
    server: {
      hmr: {
        host: 'localhost',
        port: 5173, // Ensure this matches your setup
        protocol: 'ws', // Use 'wss' if using HTTPS
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        stream: 'stream-browserify',
        util: 'util',
      },
    },
    define: {
      global: 'globalThis',
      'process.env': {}, // Avoid undefined errors for process.env
      'import.meta.env': {
        VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL),
        VITE_SUPABASE_KEY: JSON.stringify(env.VITE_SUPABASE_KEY),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
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
};
