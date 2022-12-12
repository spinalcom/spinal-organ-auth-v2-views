<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view id="content" />
  </div>
</template>

<script>
import Navbar from "./views/SideBar.vue";
export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    
  }
}
</script>

<style>
#app {
  overflow-x: scroll;
}

#content {
  margin-top: 80px;
  padding: 10px;
}
</style>
