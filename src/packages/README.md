# hex-ui
* 1、前置步骤：修改 `manifest.json` 内的 `vue` 版本为 `vue3`
* 2、项目根目录新增 `index.html` 文件，文件代码为
```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
		<title></title>
		<!--preload-links-->
		<!--app-context-->
		<!-- 配置H5的 web图标static/logo.png -->
		<link rel="icon" href="./static/logo.png" />
	</head>
	<body>
		<div id="app">
			<!--app-html-->
		</div>
		<script type="module" src="/main.js"></script>
	</body>
</html>
```

* 3、main.js 引入 hex-ui 

```js
// 引入 hexUi
import hexUi from './uni_modules/hex-ui';

import { createSSRApp } from 'vue'

export function createApp() {
  const app  = createSSRApp(App)
  
  // 使用 hexUi
  app.use(hexUi)
  
  return { app }
}

```

* 4、App.vue 引入基础样式（注意style标签需声明scss属性支持）

```html
<style lang="scss">
	@import "./uni_modules/hex-ui/index.scss";
</style>
```

* 5、uni.scss 引入全局 scss 变量文件

```css
@import "@/uni_modules/hex-ui/theme.scss";
```
