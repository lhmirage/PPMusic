<template>
  <div class="main-router-pages">
    <header-main v-if="!($route.path.indexOf('/login') !== -1)"></header-main>
    <router-view class="router-page"></router-view>
    <footer-main></footer-main>
    <go-top></go-top>
    <play-bar v-if="Object.keys(currentSong).length !== 0"></play-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GoTop from '../components/common/GoTop.vue'
import PlayBar from '../components/playlistdetail/PlayBar.vue'
import FooterMain from './FooterMain.vue'
import HeaderMain from './HeaderMain.vue'
import Login from "./Login.vue"
export default {
  name: "MainRouterPages",
  components: {
    Login,
    HeaderMain,
    FooterMain,
    GoTop,
    PlayBar
  },
  computed: {
    ...mapGetters([
      "currentSong"
    ])
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