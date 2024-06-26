import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import fs from "fs";
import { nodePolyfills } from 'vite-plugin-node-polyfills'


const particleWasmPlugin = {
  name: 'particle-wasm',
  apply: (_, env) => {
    return env.mode === 'development';
  },
  buildStart: () => {
    const copiedPath = path.join(
        __dirname,
        'node_modules/@particle-network/thresh-sig/wasm/thresh_sig_wasm_bg.wasm'
    );
    const dir = path.join(__dirname, 'node_modules/.vite/wasm');
    const resultPath = path.join(dir, 'thresh_sig_wasm_bg.wasm');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.copyFileSync(copiedPath, resultPath);
  },
};


export default defineConfig({
  plugins: [
    nodePolyfills(),
    react(),
    particleWasmPlugin
  ],
})
