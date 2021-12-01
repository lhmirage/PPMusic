<template>
  <div class="home">
    <div v-if="!isLoading">
      <banner></banner>
      <recommend-song-sheet :songSheetList="songSheetList"></recommend-song-sheet>
      <recommend-songs></recommend-songs>
      <recommend-singer></recommend-singer>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from '../components/common/Loading.vue'
import Banner from '../components/home/Banner.vue'
import RecommendSinger from '../components/home/RecommendSinger.vue'
import RecommendSongs from '../components/home/RecommendSongs.vue'
import RecommendSongSheet from '../components/home/RecommendSongSheet.vue'
export default {
  components: {
    Banner,
    RecommendSinger,
    Loading,
    RecommendSongSheet,
    RecommendSongs
  },
  name: 'Home',
  data () {
    return {
      isLoading: false,
      pageY: 600,
      isShowGoTop: false,
      limit: 24,
      songSheetList: []
    }
  },
  created () {
    this.getRecommendSongSheet()
  },
  methods: {
    async getRecommendSongSheet () {
      try {
        let res = await this.$api.getRecommendSongeSheet(this.limit)
        if (res.status === 200 && res.statusText === "OK") {
          this.songSheetList = res.data.result
          this.isLoading = false
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped lang="less">
.home {
  width: 100%;
  min-width: 1200px;
  padding-bottom: 20px;
  padding-top: 60px;
}
</style>