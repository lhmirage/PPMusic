<template>
  <div class="song-sheet">
    <div v-if="!isLoading">
      <tag-bar :mainTag="mainTag"
               :songSheetParams="songSheetParams"
               :hotTags="hotTags"
               :categoryType="categoryType"
               :videoPage="true"
               @switchHotTags="switchHotTags"
               @chooseType="chooseType"
               @transitionClick="transitionClick">
      </tag-bar>
      <song-sheet-list :songSheetList="songSheetList"></song-sheet-list>
      <!-- 分页区域 -->
      <el-pagination :page-size="songSheetParams.limit"
                     layout="total, prev, pager, next"
                     @current-change="currentChange"
                     :total="total">
      </el-pagination>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import Loading from '../components/common/Loading.vue'
import SongSheetList from '../components/common/SongSheetList.vue'
import TagBar from '../components/common/TagBar.vue'
export default {
  name: 'SongSheet',
  components: { TagBar, Loading, SongSheetList },
  data () {
    return {
      mainTag: "全部",
      hotTags: [],
      categoryType: [
        {
          key: 0,
          icon: "iconfont iconyuzhong",
          value: "语种",
          tags: null
        },
        {
          key: 1,
          icon: "iconfont iconfengge",
          value: "风格",
          tags: null
        },
        {
          key: 2,
          icon: "iconfont iconchangjing",
          value: "场景",
          tags: null
        },
        {
          key: 3,
          icon: "iconfont iconqinggan",
          value: "情感",
          tags: null
        },
        {
          key: 4,
          icon: "iconfont iconzhuti",
          value: "主题",
          tags: null
        }
      ],
      songSheetParams: {
        order: "hot",
        cat: "全部",
        limit: 40,
        offset: 0
      },
      songSheetList: [],
      total: 0,
      isLoading: true
    }
  },
  methods: {
    // 弹窗点击
    transitionClick (tagName) {
      this.mainTag = tagName
      this.songSheetParams.cat = tagName
      // 请求数据
      this.getSongSheet()
    },
    currentChange (currentPage) {
      this.songSheetParams.offset = currentPage - 1
      // 请求数据
      this.getSongSheet()
    },
    // 选择显示类型
    chooseType (type) {
      if (type === this.songSheetParams.order) {
        return
      }
      this.songSheetParams.order = type
      // 请求数据
      this.getSongSheet()
    },
    switchHotTags (tag) {
      this.songSheetParams.cat = tag.name
      // 请求数据
      this.getSongSheet()
    },
    // 获取热门歌单分类
    async getHotSongSheet () {
      try {
        let res = await this.$api.getHotSongSheet()
        if (res.status === 200 && res.statusText === "OK") {
          this.hotTags = res.data.tags
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取全部歌单分类
    async getSongSheetCategory () {
      try {
        let res = await this.$api.getSongSheetCategory()
        if (res.status === 200 && res.statusText === "OK") {
          this.category(res.data.sub, 5)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 将全部歌单列表分类
    category (sub, count) {
      for (let i = 0; i < count; i++) {
        let itemArr = []
        for (let j = 0; j < sub.length; j++) {
          if (sub[j].category === i) {
            itemArr.push(sub[j])
          }
        }
        this.categoryType[i].tags = itemArr
      }
    },
    async getSongSheet () {
      try {
        let res = await this.$api.getSongSheet(this.songSheetParams)
        if (res.status === 200 && res.statusText === "OK") {
          this.songSheetList = res.data.playlists
          this.total = res.data.total
          this.isLoading = false
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    let cat = this.$route.query.tag
    if (cat) {
      this.songSheetParams.cat = cat
      this.mainTag = cat
    }
    // 获取各种歌单
    this.getHotSongSheet()
    this.getSongSheetCategory()
    this.getSongSheet()
  }
}
</script>

<style scoped lang="less">
.song-sheet {
  min-width: 1200px;
  padding-top: 85px;
  padding-bottom: 30px;
  position: relative;

  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  .el-pagination /deep/ button {
    background-color: #f4f4f4;
    border-radius: 4px;
    margin: 0 4px;
  }
  .el-pagination /deep/ .el-pager {
    display: flex;
    justify-content: center;
    padding: 10px 0px 0px 0px;
  }
  .el-pagination /deep/ ul > li {
    background-color: #f4f4f4;
    border-radius: 4px;
    margin: 0 4px;
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    float: left;
  }
  .el-pagination /deep/ .el-pager li.el-icon::after {
    content: '...';
  }
  .el-pagination /deep/ .el-pager li.active {
    background-color: #fa2800;
    color: #fff;
  }
  .el-pagination /deep/ .el-pager li:hover {
    color: #fa2800;
  }
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>