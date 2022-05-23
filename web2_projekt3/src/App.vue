<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/1-way-binding">One-Way Binding</router-link> |
    <router-link to="/calc">Two-Way Binding, Methods & Computed</router-link> |
    <router-link to="/lifecycle">Lifecycle</router-link> |
    <router-link to="/component-emit">Component Emit</router-link> |
    <router-link to="/store">Store</router-link> |
    <router-link to="/async">Async</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
  <app-footer />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.footer{
  width:100%;
  position: fixed;
  height: 10%;
  bottom: 0;
  left: 0;
}
</style>
