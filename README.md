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
```
