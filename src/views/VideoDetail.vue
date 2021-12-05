<template>
  <div class="video-detalil">
    <div class="left-container">
      <video-main :url="url"
                  :videoDetail="videoDetail"
                  :videoDetailInfo="videoDetailInfo"
                  :collectionButton="videoDetailInfo"
                  @likeClick="likeClick"
                  @collectionVideo="collectionVideo">
      </video-main>
    </div>
    <div class="right-container">
      <video-recommend :videoRecommend="videoRecommend"
                       :videoDetail="videoDetail"
                       @play="play">
      </video-recommend>
    </div>
  </div>
</template>

<script>
import VideoMain from '../components/common/VideoMain.vue'
import VideoRecommend from '../components/common/VideoRecommend.vue'
export default {
  name: "VideoDetail",
  components: { VideoMain, VideoRecommend },
  data () {
    return {
      url: '',
      videoDetail: {},
      videoDetailInfo: {},
      videoRecommend: [],
      collectionButton: false
    }
  },
  methods: {
    // 收藏视频
    collectionVideo () {
      let t = 1
      this._collectionVideo(t)
    },
    // 资源点赞
    likeClick (liked) {
      let t = liked ? 0 : 1
      this.resourceLike(t)
    },
    play (id) {
      this.$router.push(`/video-detail/${id}`)
      // 获取视频url播放地址
      this.getVideoUrl()
      // 获取视频详情数据
      this.getVideoDetail()
      // 获取视频点赞转发评论数数据
      this.getVideoDetailInfo()
      // 获取相关视频
      this.getRecommendVideo()
    },
    // 收藏视频
    async _collectionVideo () {
      let params = {
        id: this.$route.params.id,
        t: t,
        timeStamp: new Date().valueOf()
      }
      let res = await this.$api.collectionVideo(params)
      if (res && res.data.code === 200) {
        setTimeout(() => {
          if (t === 1) {
            this.collectionButton = true
          }
          this.getVideoDetail()
        }, 20)
      } else if (res === undefined) {
        let t = 0
        this.collectionButton = false
        this._collectionVideo(t)
      }
    },
    async resourceLike (t) {
      let params = {
        id: this.$route.params.id,
        type: 5,
        t: t,
        timeStamp: new Date().valueOf()
      }
      let res = await this.$api.resourceLike(params)
      if (res.data.code === 200) {
        this.getVideoDetailInfo()
      }
    },
    // 获取视频url播放地址
    async getVideoUrl () {
      let params = {
        id: this.$route.params.id,
        timeStamp: new Date().valueOf()
      }
      let res = await this.$api.getVideoUrl(params)
      if (res && res.data.code === 200) {
        this.url = res.data.urls[0].url
      }
    },
    // 获取视频详情
    async getVideoDetail () {
      let params = {
        id: this.$route.params.id,
        timeStamp: new Date().valueOf()
      }
      let res = await this.$api.getVideoDetail(params)
      if (res && res.data.code === 200) {
        let obj = {}
        obj.playCount = res.data.data.playTime
        obj.publishTime = res.data.data.publishTime
        obj.subCount = res.data.data.subscribeCount
        res.data.data.videoGroup.map(item => {
          item.name = item.name.replace(/#/g, "")
        })
        obj.videoGroup = res.data.data.videoGroup
        this.videoDetail = obj
      }
    },
    // 获取视频点赞转发评论数数据
    async getVideoDetailInfo () {
      let params = {
        vid: this.$route.params.id,
        timeStamp: new Date().valueOf()
      }
      let res = await this.$api.getVideoDetailInfo(params)
      if (res && res.data.code === 200) {
        this.videoDetailInfo = res.data
      }
    },
    // 获取相关视频
    async getRecommendVideo () {
      let params = {
        id: this.$route.params.id,
        timeStamp: new Date().valueOf()
      }
      let res = await this.$api.getRecommendVideo(params)
      if (res && res.data.code === 200) {
        res.data.data.map(item => {
          let obj = {}
          obj.id = item.vid
          obj.cover = item.coverUrl
          obj.name = item.title
          obj.artists = item.creator.map(it => it.userName).join("/")
          this.videoRecommend.push(obj)
        })
      }
    }
  },
  created () {
    // 获取视频url播放地址
    this._getVideoUrl()
    // 获取视频详情数据
    this._getVideoDetail()
    // 获取视频点赞转发评论数数据
    this._getVideoDetailInfo()
    // 获取相关视频
    this._getRecommendVideo()
  }
}
</script>

<style scoped lang="less">
.video-detalil {
  padding-top: 85px;
  padding-bottom: 30px;
  display: flex;
  align-items: flex-start;
  .left-container,
  .right-container {
    padding: 20px;
  }
  .left-container {
    flex: 1;
    min-width: 700px;
    box-shadow: 0 5px 40px rgba(2, 10, 18, 0.1);
    border-radius: 10px;
  }
  .right-container {
    width: 400px;
    margin-left: 20px;
  }
}
</style>