## uniapp + vite + vue3.0 + typescript
+ uview-plus
+ unocss
+ pinia
+ pinia-plugin-persistedstate
+ vue-i18n

## 插件的使用
因为是通过使用 npm 安装的，npm 是没有经过打包的.vue 及其 .ts 文件所有要按照以下方式使用

```js
import { test } from '@azhena/uniapp-ui/index';
```

[插件地址](https://github.com/MellowCo/unocss-preset-weapp/blob/d2f03b3f19b975bbd0ebc5979cbe2adb8044ab24/src/preflights.ts#L14)

[unocss](https://unocss.dev/config/preflights#preflights)