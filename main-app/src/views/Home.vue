<template>
  <div class="home">
    <h2>欢迎来到微前端示例</h2>
    <p>这是一个使用 wujie 搭建的微前端示例项目</p>
    <div class="app-list">
      <div class="app-item">
        <h3>Vue3 子应用</h3>
        <router-link to="/vue3" class="app-link">访问应用</router-link>
      </div>
      <div class="app-item">
        <h3>React 子应用</h3>
        <router-link to="/react" class="app-link">访问应用</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}
.app-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}
.app-item {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 200px;
}
.app-link {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>