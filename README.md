# Wujie 微前端示例项目

这是一个使用 Wujie 搭建的微前端示例项目，包含一个主应用和两个子应用（Vue3 和 React）。

## 项目结构

```
wujie-learn/
├── main-app/     # 主应用 (Vue3)
├── vue3-app/     # Vue3 子应用
└── react-app/    # React 子应用
```

## 技术栈

- 主应用：Vue 3 + Vite + Vue Router
- 子应用1：Vue 3 + Vite
- 子应用2：React + Vite
- 微前端框架：Wujie

## 本地开发

### 1. 安装依赖

分别在三个应用目录下安装依赖：

```bash
# 安装主应用依赖
cd main-app
npm install

# 安装 Vue3 子应用依赖
cd ../vue3-app
npm install

# 安装 React 子应用依赖
cd ../react-app
npm install
```

### 2. 启动项目

方式一：一键启动所有应用（推荐）
```bash
cd main-app
npm run dev:all
```

方式二：分别启动各个应用

```bash
# 启动主应用
cd main-app
npm run dev

# 启动 Vue3 子应用
cd vue3-app
npm run dev

# 启动 React 子应用
cd react-app
npm run dev
```

启动后访问地址：
- 主应用：http://localhost:5175
- Vue3 子应用：http://localhost:5173
- React 子应用：http://localhost:5174

## 生产部署

### 1. 构建应用

分别在各个应用目录下执行构建命令：

```bash
# 构建主应用
cd main-app
npm run build

# 构建 Vue3 子应用
cd ../vue3-app
npm run build

# 构建 React 子应用
cd ../react-app
npm run build
```

### 2. 部署步骤

1. 部署子应用：
   - 将 `vue3-app/dist` 目录部署到服务器，假设访问地址为 `https://vue3.example.com`
   - 将 `react-app/dist` 目录部署到服务器，假设访问地址为 `https://react.example.com`

2. 修改主应用配置：
   - 修改主应用中子应用的 URL 配置，将开发环境的地址改为生产环境地址

   ```js
   // main-app/src/views/vue3.vue
   <WujieVue
     width="100%"
     height="100%"
     name="vue3"
     url="https://vue3.example.com"
   ></WujieVue>

   // main-app/src/views/react.vue
   <WujieVue
     width="100%"
     height="100%"
     name="react"
     url="https://react.example.com"
   ></WujieVue>
   ```

3. 部署主应用：
   - 将 `main-app/dist` 目录部署到服务器，假设访问地址为 `https://main.example.com`

## 注意事项

1. 确保子应用的 vite.config.js 中配置了正确的 CORS 头部
2. 生产环境部署时，需要确保各个应用的域名或路径配置正确
3. 建议使用 nginx 进行反向代理配置

## 常见问题

1. 跨域问题：确保子应用配置了正确的 CORS 头部
2. 路由冲突：确保主应用和子应用的路由规则不冲突
3. 资源加载：确保生产环境的资源路径配置正确

## 参考文档

- [Wujie 官方文档](https://wujie-micro.github.io/doc/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [React 文档](https://react.dev/)


## 依赖共享配置

### 1. 主应用配置

在主应用中加载公共依赖：

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WujieVue from "wujie-vue3"
import React from 'react'
import ReactDOM from 'react-dom'

// 将公共依赖挂载到全局
window.React = React
window.ReactDOM = ReactDOM
window.Vue = createApp

const app = createApp(App)
app.use(router)
app.use(WujieVue)
app.mount('#app')
```

### 2. Vue3 子应用配置

修改 Vue3 子应用的 vite.config.js：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

### 3. React 子应用配置

修改 React 子应用的 vite.config.js：

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

### 4. 注意事项

1. 确保主应用中加载的依赖版本与子应用开发时使用的版本兼容
2. 在子应用的 package.json 中将共享依赖标记为 peerDependencies：

```json
{
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}
```

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### 5. 优势

1. 减小子应用打包体积
2. 避免重复加载相同依赖
3. 提高应用加载性能
4. 确保依赖版本一致性


这样配置后，主应用会加载并共享通用依赖，子应用则通过 externals 配置排除这些依赖，从而避免重复加载。这种方式可以有效减小子应用的打包体积，提高加载性能。


## 性能优化配置

### 1. 子应用懒加载

修改主应用的路由配置：

```js
import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/vue3',
      name: 'vue3',
      component: () => defineAsyncComponent(() => import('../views/vue3.vue')),
      meta: { preload: false }  // 控制是否预加载
    },
    {
      path: '/react',
      name: 'react',
      component: () => defineAsyncComponent(() => import('../views/react.vue')),
      meta: { preload: false }
    }
  ]
})
```

### 2. 代码分割配置

Vue3 子应用的 vite.config.js 配置：

```js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue'],
          'utils': ['./src/utils/**/*.js'],
          'components': ['./src/components/**/*.vue']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

React 子应用的 vite.config.js 配置：

```js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'utils': ['./src/utils/**/*.js'],
          'components': ['./src/components/**/*.jsx']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### 3. 缓存策略配置

Nginx 配置示例：

```nginx
# 静态资源缓存配置
location /static/ {
    expires 1y;
    add_header Cache-Control "public, no-transform";
}

# JS/CSS 文件缓存配置
location ~* \.(js|css)$ {
    expires 1d;
    add_header Cache-Control "public, no-transform";
}

# HTML 文件不缓存
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### 4. 预加载配置

主应用中配置预加载策略：

```js
import WujieVue from "wujie-vue3"

app.use(WujieVue, {
  preload: true,  // 是否开启预加载
  props: {
    jump: (name) => router.push({ name })
  }
})

// 配置预加载应用
const preloadApps = [
  {
    name: "vue3",
    url: "http://localhost:5173",
    exec: true
  }
]

// 执行预加载
window.addEventListener("load", () => {
  preloadApps.forEach(app => {
    window.$wujie?.preloadApp(app)
  })
})
```

### 5. 优化建议

1. **子应用按需加载**
   - 路由懒加载
   - 组件异步加载
   - 使用 `Suspense` 和 `defineAsyncComponent`

2. **资源优化**
   - 使用 HTTP/2
   - 开启 gzip 压缩
   - 使用 CDN 加速
   - 图片懒加载和压缩

3. **缓存优化**
   - 合理设置缓存策略
   - 使用 Service Worker
   - 利用浏览器缓存
   - 实现资源预加载

4. **构建优化**
   - Tree Shaking
   - 代码分割
   - 压缩混淆
   - 移除未使用代码

5. **监控与分析**
   - 性能监控
   - 错误监控
   - 加载时间分析
   - 资源大小分析
