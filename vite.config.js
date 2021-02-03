import reactRefresh from '@vitejs/plugin-react-refresh';
import viteESLint from '@ehutch79/vite-eslint';
import path from 'path';

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
const config = {
  plugins: [reactRefresh(), viteESLint({ include: ['src/**/*.(js|jsx)'] })],
  alias: {
    pages: path.resolve(__dirname, './src/pages'),
    auth: path.resolve(__dirname, './src/auth'),
    layout: path.resolve(__dirname, './src/layout'),
    components: path.resolve(__dirname, './src/components'),
    utils: path.resolve(__dirname, './src/utils'),
    queries: path.resolve(__dirname, './src/queries'),
  },
  server: {
    port: 8080,
  },
};

export default config;
