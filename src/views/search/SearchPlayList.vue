<template>
  <div class="search-play-list">
    <song-sheet-list :songSheetList="searchData"></song-sheet-list>
  </div>
</template>

<script>
import SongSheetList from '../../components/common/SongSheetList.vue'
export default {
  name: "SearchPlayList",
  components: { SongSheetList },
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