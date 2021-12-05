<template>
  <div class="mv-detail">
    <div class="left-container">
      <video-main :videoDetailInfo="mvDetailInfo"
                  :videoDetail="mvDetail"
                  :url="url"
                  @likeClick="likeClick">
      </video-main>
    </div>
    <div class="right-container">
      <video-recommend :videoDetail="mvDetail"
                       :videoRecommend="recommendMv"
                       @play="play">
      </video-recommend>
    </div>
  </div>
</template>

<script>
import VideoMain from '../components/common/VideoMain.vue'
import VideoRecommend from '../components/common/VideoRecommend.vue'
export default {
  name: "MvDetail",
  components: { VideoMain, VideoRecommend },
  data () {
    return {
      // 播放地址
      url: "",
      // mv详情
      mvDetail: {},
      // mv点赞转发评论数
      mvDetailInfo: {},
      // 推荐mv
      recommendMv: []
    }
  },
  methods: {
    // 资源点赞
    likeClick (liked) {
      let t = liked ? 0 : 1
      this.resourceLike(t)
    },
    // 点击播放推荐mv
    play (id) {
      this.$router.push(`/mv-detail/${id}`)
      // 获取 mv 播放地址
      this.getMvURL()
      // 获取 mv 详情信息
      this.getMvDetail()
      // 获取 mv 点赞转发评论数数据
      this.getMvDetailInfo()
      // 获取相关推荐 mv (相似 mv)
      this.getRecommendMv()
    },
    // 资源点赞
    async resourceLike (t) {
      let params = {
        id: this.$route.params.id,
        type: 1,
        t: t,
        timeStamp: new Date().valueOf()
      }
      let res = await this.$api.resourceLike(params)
      if (res.data.code === 200) {
        setTimeout(() => {
          // 获取mv点赞转发评论数
          this.getMvDetailInfo()
        }, 500)
      }
    },
    // 获取mv播放地址
    async getMvURL () {
      try {
        let params = {
          id: this.$route.params.id,
          r: 1080
        }
        let res = await this.$api.getMvURL(params)
        if (res.status === 200 && res.statusText === "OK") {
          this.url = res.data.data.url
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取mv详细信息
    async getMvDetail () {
      try {
        let res = await this.$api.getMvDetail(this.$route.params.id)
        if (res.status === 200 && res.statusText === "OK") {
          this.mvDetail = res.data.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取mv点赞转发评论数
    async getMvDetailInfo () {
      try {
        let params = {
          mvid: this.$route.params.id,
          timeStamp: new Date().valueOf()
        }
        let res = await this.$api.getMvDetailInfo(params)
        if (res.status === 200 && res.statusText === "OK") {
          this.mvDetailInfo = res.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取相关推荐mv(相似mv)
    async getRecommendMv () {
      try {
        let res = await this.$api.getRecommendMv(this.$route.params.id)
        if (res.status === 200 && res.statusText === "OK") {
          res.data.mvs.forEach(item => {
            item.artists = item.artists.map(it => {
              return it.name
            }).join("/")
          })
          this.recommendMv = res.data.mvs
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    // 获取 mv 播放地址
    this.getMvURL()
    // 获取 mv 详情信息
    this.getMvDetail()
    // 获取 mv 点赞转发评论数数据
    this.getMvDetailInfo()
    // 获取相关推荐 mv (相似 mv)
    this.getRecommendMv()
  }
}
</script>

<style scoped lang="less">
.mv-detail {
  padding-top: 85px;
  padding-bottom: 40px;
  display: flex;
  align-items: flex-start;
  .left-container {
    flex: 1;
    box-shadow: 0 5px 40px rgba(2, 10, 18, 0.1);
    padding: 15px;
    border-radius: 10px;
    min-width: 600px;
    margin-right: 20px;
  }
  .right-container {
    flex: 0 0 auto;
    width: 350px;
  }
}

.clearfix::before {
  content: "";
  display: block;
  clear: both;
}
</style>