<template>
  <div class="main-router-pages">
    <Login />
    <!-- <register /> -->
  </div>
</template>

<script>
import Login from "./Login.vue"
import Register from './Register.vue'
export default {
  name: "MainRouterPages",
  components: {
    Login,
    Register
  }

}
</script>

<style scoped lang="less">
.main-router-pages {
  position: relative;
  min-height: 100vh;
  min-width: 1200px;
  .router-page {
    padding-left: 5%;
    padding-right: 5%;
    min-height: 473px;
  }
}
</style>