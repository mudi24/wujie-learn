<template>
  <div class="main-app">
    <h1>微前端示例</h1>
    <div class="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/vue3">Vue3 子应用</router-link> |
      <router-link to="/react">React 子应用</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.main-app {
  padding: 20px;
  text-align: center;
}
.nav {
  padding: 20px 0;
}
.nav a {
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}
.nav a.router-link-active {
  color: #42b983;
}
.content {
  margin-top: 20px;
  min-height: 500px;
}
</style>
