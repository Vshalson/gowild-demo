import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // 1. Remove the 'root: public' setting entirely. Vite defaults to the project root.
  
  // 2. Set the base path for relative asset loading (best for static deployments like GitHub Pages)
  base: './', 

  build: {
    // 3. Output to the standard 'dist' folder.
    outDir: 'dist',
    emptyOutDir: true,
  },
  
  // 4. Any files in the 'public/' directory (if you still use it for images/static assets)
  //    will automatically be copied to the root of the build output.
});