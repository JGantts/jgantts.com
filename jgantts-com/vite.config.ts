import { fileURLToPath, URL } from "node:url";

import { defineConfig, type ServerOptions } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  let server: ServerOptions
  let publicDir: string|boolean = "PUBLIC"
  if (command === 'serve' ) {
    // dev
    server = {
      host: true,
      port: 42301,
      strictPort: true
    }
  } else { // command === build
    // prod
    publicDir = false
    server = {
      host: false
    }
  }
  let outDir: string
  outDir = './dist/'

  return {
    publicDir : publicDir,
    server,
    build: {
      emptyOutDir: true,
      outDir
    },
    plugins: [
      vue(),
      svgLoader(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
  },
}});
