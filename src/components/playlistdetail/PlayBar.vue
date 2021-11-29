<template>
  <div class="play-bar">
    <div class="centent">
      <div class="avatar">
        <img v-lazy="currentSong.picUrl"
             alt="">
      </div>
      <div class="info">
        <h2>{{currentSong.song}}</h2>
        <p>{{currentSong.singer}}</p>
      </div>
      <div class="contorller">
        <i class="iconfont iconnext"
           @click="playPrevSong"></i>
        <i class="iconfont iconbofang4"
           v-show="isPlay"
           @click="startPlay"></i>
        <i class="iconfont iconbofang3"
           v-show="!isPlay"
           @click="pausePlay"></i>
        <i class="iconfont iconprev"
           @click="playNextSong"></i>
      </div>
      <div class="play-progress"
           @mousedown="isSetProgress = true"
           @mouseup="isSetProgress = false">
        <span class="current-time">{{currentTime | formatCurrentTime}}</span>
        <el-slider v-model="progress"
                   :format-tooltip="formatToolTip"
                   @change="setProgress">
        </el-slider>
        <span class="total-time">{{currentSong.transitionTime | formatPlayTime}}</span>
      </div>
      <div class="volnum-control">
        <i :class="isMutedIcon"
           @click="mutedClick"></i>
        <el-slider v-model="volumeSlider"
                   @change="setVolume(volumeSlider)">
        </el-slider>
      </div>
      <div class="icon-button">
        <i class="iconfont iconxunhuan"
           :class="{'active-icon': playMode === 'orderPlay'}"
           @click="orderPlay"></i>
        <i class="iconfont icondanquxunhuan"
           :class="{'active-icon': playMode === 'oneLoop'}"
           @click="oneLoop"></i>
        <i class="iconfont iconplay-random"
           :class="{'active-icon': playMode === 'randomPlay'}"
           @click="randomPlay"></i>
        <i class="iconfont icongeci"
           @click="openLyric"></i>
        <i class="iconfont iconplaylsit"
           @click="openPlayRecord"></i>
      </div>

      <audio :src="playUrl"
             :muted="isMuted"
             ref="audio"
             @timeupdate="timeupdate"
             @ended="ended"
             @error="error">
      </audio>

      <transition name="fade">
        <div class="lyric"
             v-show="isOpenLyric">
          <h2>歌词</h2>
          <scroll ref="lyricList">
            <div v-if="nolyric">暂无歌词</div>
            <div v-if="!nolyric && currentLyric">
              <div class="lyric-wrapper">
                <p ref="lyricLine"
                   v-for="(item, index) in currentLyric.lines"
                   :key="index"
                   :class="currentLineNum === index ? 'active-lyric-text' : ''">
                  {{item.txt}}
                </p>
              </div>
            </div>
          </scroll>
        </div>
      </transition>
      <transition name="fade">
        <div class="play-list"
             v-show="isOpenPlayRecord">
          <h2>
            播放记录
            <i class="iconfont iconlajitong"
               @click="deteleAll"></i>
          </h2>
          <div class="play-list-table">
            <table>
              <thead>
              </thead>
              <tbody>
                <tr v-for="(item, index) in playRecord"
                    :key="item.id">
                  <td class="num">
                    <play-button :item="item"
                                 :index="index"></play-button>
                  </td>
                  <td class="song">
                    {{item.song}}
                    <i class="iconfont iconerror"
                       v-if="item.error"
                       title="播放源错误!"></i>
                  </td>
                  <td class="delete">
                    <i class="iconfont icondelete"
                       @click="removeItem(index)"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PlayButton from "../common/PlayButton";
import { mapGetters, mapMutations } from "vuex"
import Lyric from "lyric-parser"
import Scroll from "../common/Scroll"
export default {
  name: "PlayBar",
  components: {
    PlayButton,
    Scroll
  },
  data () {
    return {
      // 进度条
      progress: 0,
      // 控制歌词显隐
      isOpenLyric: false,
      // 控制播放列表的显隐
      isOpenPlayRecord: false,
      // 当前时长
      currentTime: 0,
      // 音量
      volumeSlider: 20,
      // audio 元素
      audio: null,
      // 是否静音
      isMuted: false,
      // 当前行号
      currentLineNum: 0,
      // 当前歌词对象
      currentLyric: null,
      // 是否在人为设置进度条
      isSetProgress: false,
      // 是否有歌词
      nolyric: false
    }
  },
  filters: {
    // 格式化当前时间
    formatCurrentTime (time) {
      let m = parseInt(time / 60)
      let s = parseInt(time % 60)
      if (s < 10) {
        s = "0" + s
      }
      if (m < 10) {
        m = "0" + m
      }
      return m + ":" + s
    }
  },
  computed: {
    isMutedIcon () {
      return this.isMuted ? "iconfont iconjingyin" : "iconfont iconshengyin"
    },
    playUrl () {
      return `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`
    },
    ...mapGetters([
      "currentSong",
      "playRecord",
      "isPlay",
      "playMode",
      "playList"
    ])
  },
  watch: {
    // 监听播放记录变化
    playRecord (ne, old) {
      window.localStorage.setItem("playRecord", JSON.stringify(this.playRecord))
    },
    // 监听当前播放状态
    isPlay (news, old) {
      console.log(news, old)
    },
    // 监听当前歌曲的变化
    currentSong (newSong, oldSong) {
      // 清空lyric-parser对象
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      // 获取歌词
      this.getCurrentSongLyric(newSong.id)
    }
  },
  methods: {
    // 移除播放列表选择项
    removeItem (index) {
      this.$store.commit("removeItem", index)
    },
    // 顺序播放
    orderPlay () {
      // 改变icon图标
      this.setPlayMode('oneLoop')
    },
    // 单曲循环播放
    oneLoop () {
      // 改变icon图标
      this.setPlayMode('randomPlay')
    },
    // 循环播放
    randomPlay () {
      // 改变icon图标
      this.setPlayMode('orderPlay')
    },
    // 下载过程中错误。例如突然无网络了。或者文件地址不对。
    error () {
      this.$message.error("下载发生了错误！")
      this.setCurrentSongError(true)
      // 自动播放下一首
      this.playNextSong()
      setTimeout(() => {
        this.audio.play()
      }, 20)
    }

  }
}
</script>

<style lang="less">
</style>