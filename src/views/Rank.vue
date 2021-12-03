.<template>
  <div class="rank">
    <div v-if="!isLoading">
      <h2>音乐特色榜</h2>
      <song-sheet-list :songSheetList="this.topList.slice(0, 4)"></song-sheet-list>
      <h2>全球媒体榜</h2>
      <song-sheet-list :songSheetList="this.topList.slice(4, )"></song-sheet-list>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from '../components/common/Loading.vue'
import SongSheetList from "../components/common/SongSheetList.vue"

export default {
  name: 'Rank',
  components: { SongSheetList, Loading },
  data () {
    return {
      topList: [],
      isLoading: true
    }
  },
  methods: {
    async getRankTopList () {
      try {
        let res = await this.$api.getRankTopList()
        if (res.status === 200 && res.statusText === "OK") {
          this.isLoading = false
          res.data.list.forEach(item => {
            let topListObj = {}
            topListObj.picUrl = item.coverImgUrl
            topListObj.name = item.name
            topListObj.playCount = item.playCount
            topListObj.id = item.id
            this.topList.push(topListObj)
          })
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created () {
    this.getRankTopList()
  }
}
</script>

<style scoped lang="less">
.rank {
  min-width: 1200px;
  padding-bottom: 10px;
  padding-top: 80px;
  h2 {
    padding: 20px 0 20px 18px;
  }
}
</style>