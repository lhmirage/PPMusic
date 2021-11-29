<template>
  <div class="go-top">
    <div class="bg-top"
         @click="goTop"
         v-show="isShow"></div>
  </div>
</template>

<script>
export default {
  name: "GoTop",
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    goTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    isShowCom () {
      if (window.pageYOffset > 700) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.isShowCom)
  }
}
</script>

<style scoped lang="less">
.go-top {
  position: relative;
  .bg-goTop {
    z-index: 999;
    position: fixed;
    right: 20px;
    bottom: 60px;
    width: 100px;
    height: 100px;
    background: url("../../assets/images/gotop.png") no-repeat center;
  }
}
</style>