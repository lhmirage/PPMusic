<template>
  <div class="banner">
    <swiper :option="swiperOption"
            v-if="bannersInit">
      <swiper-slide v-for="banner in banners"
                    :key="banner.imageUrl">
        <img v-lazy="banner.imageUrl" />
      </swiper-slide>
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data () {
    return {
      banners: [],
      swiperOption: {
        autoplay: 3000,  // 轮播间隔时间
        loop: true　　// 是否自动轮播
      }
    }
  },
  computed: {
    bannersInit () {
      return this.banners.length > 0
    }
  },
  created () {
    this.getBanner()
  },
  methods: {
    async getBanner () {
      try {
        let res = await this.$api.getBanner()
        if (res.status === 200 && res.statusText === "OK") {
          this.banners = res.data.banners
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped lang="less">
.banner {
  .swiper-container {
    width: 100%;
    padding: 20px 0px 30px;
    .swiper-wrapper {
      .swiper-slide {
        display: flex;
        justify-content: center;
        img {
          height: 336.5px;
          border-radius: 3px;
          
        }
      }
    }
  }
}
</style>