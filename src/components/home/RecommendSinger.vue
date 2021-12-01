<template>
  <div class="recommend-singer"
       v-if="this.singers.length > 0">
    <h2>推荐歌手</h2>
    <singer-list :singers="singers"></singer-list>
  </div>
</template>

<script>
import SingerList from '../common/SingerList'
export default {
  name: "RecommendSinger",
  components: { SingerList },
  data () {
    return {
      singers: [],
      limit: 30
    }
  },
  methods: {
    async getRecommendSinger () {
      try {
        let res = await this.$api.getRecommendSinger(this.limit)
        if (res.status === 200 && res.statusText === "OK") {
          this.singers = res.data.artists
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created () {
    this.getRecommendSinger()
  }
}
</script>

<style scoped lang="less">
.recommend-singer{
  h2{
    padding: 30px 0 10px 0;
  }
}
</style>