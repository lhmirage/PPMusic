<template>
  <div class="search-songs">
    <play-list :playListTable="searchData" :isShowCollection="false"></play-list>
  </div>
</template>

<script>
import PlayList from '../../components/playlistdetail/PlayList.vue'
export default {
  name: "SearchSongs",
  components: { PlayList },
  props: {
    searchData: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>

</style>