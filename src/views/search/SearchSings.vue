<template>
  <div class="search-sings">
    <singer-list :singers="searchData" :isShowSongCount="false"></singer-list>
  </div>
</template>

<script>
import SingerList from '../../components/common/SingerList.vue'
export default {
  name: "SearchSings",
  components: { SingerList },
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