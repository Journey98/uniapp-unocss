import { defineConfig } from 'unocss/vite'
import { presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
// import pxToUpx from 'unocss-preset-px-to-rpx'
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerClass from './transformclass'
import pxToUpx from './px-to-upx'
// import transformClass from 'unplugin-transform-class/vite'

// import {  transformerClass } from 'unocss-preset-weapp/transformer'
import presetWeapp from 'unocss-preset-weapp'

export default defineConfig({
  //@ts-ignore
  presets: [presetUno(), presetRemToPx(), pxToUpx()],
  // presets: [presetWeapp()],
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }),
    // @ts-ignore
    // transformerClass()
    // transformerClass(),

  ],
  preflights: [{
    getCSS({ theme }) {
      console.log(theme.preflightBase);
      
      return `
      * {
        color: ${theme.colors.gray?.[700] ?? '#333'};
        padding: 0;
        margin: 0;
      }
    `
    }
  }]
})