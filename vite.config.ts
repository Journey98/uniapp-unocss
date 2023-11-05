import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      "~": resolve(__dirname, "./packages")
    }
  },
  plugins: [
    UnoCSS(),
    AutoImport({
      imports: ['vue'],
      dts: './typing/auto-imports.d.ts'
    }),
    Components({
      dirs: ['src/components/'],
      dts: './typing/components.d.ts',
    }),
    uni(),
  ],
});
