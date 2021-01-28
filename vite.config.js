import reactRefresh from '@vitejs/plugin-react-refresh';
import viteESLint from '@ehutch79/vite-eslint';

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh(), viteESLint({ include: ['src/**/*.(js|jsx)'] })],
};
