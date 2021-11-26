<template>
  <div class="footer-main">
    <div class="footer-content">
      <p>pipimusic</p>
      <p class="last-p">pipimusic</p>
      <div class="link">
        <a href="https://github.com/lhmirage">
          <i class="iconfont icongithub"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterMain'
}
</script>

<style scoped lang="less">
.footer-main{
  width: 100%;
  background-color: #161e27;
  padding-top: 20px;
  .footer-content{
    border-bottom: 1px solid #797979;
    p:first-child{
      color: #fff;
      padding: 30px 0 20px 20px;
      border-left: 5px solid #fa2800;
    }
    .last-p{
      padding: 10px;
      color: #a9a9a9;
    }
    .link{
      padding: 20px 0 20px 20px;
      i{
        font-size: 18px;
        border: 10px solid #232a31;
        border-radius: 50%;
        margin-left: 10px;
        color: #e7e7e7;
      }
    }
  }
}
</style>