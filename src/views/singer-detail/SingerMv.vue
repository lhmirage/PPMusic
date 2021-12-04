<template>
  <div class="singer-mv">
    <video-list v-if="!isLoading"
                :videoList="mvs"></video-list>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from '../../components/common/Loading.vue'
import VideoList from '../../components/common/VideoList.vue'
export default {
  name: "SingerMv",
  components: { VideoList, Loading },
  data () {
    return {
      mvs: [],
      isLoading: true
    }
  },
  methods: {
    async getSingerMv () {
      let res = await this.$api.getSingerMv(this.$route.params.id)
      if (res.status === 200 && res.statusText === "OK") {
        this.mvs = res.data.mvs
        this.isLoading = false
      }
    }
  },
  created () {
    this.getSingerMv()
  }
}
</script>

<style>
</style>