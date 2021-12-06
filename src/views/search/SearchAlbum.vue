<template>
  <div class="search-album">
    <album-list :albums="searchData"></album-list>
  </div>
</template>

<script>
import AlbumList from '../../components/common/AlbumList.vue'
export default {
  name: "SearchAlbum",
  components: { AlbumList },
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