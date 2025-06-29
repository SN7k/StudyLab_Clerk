import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('Loaded environment variables:', Object.keys(env));
  console.log('VITE_CLERK_PUBLISHABLE_KEY exists:', Boolean(env.VITE_CLERK_PUBLISHABLE_KEY));
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Ensure environment variables are properly loaded
    define: {
      // Make sure environment variables are available in the client
      'process.env': env
    },
  };
});
