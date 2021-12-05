<template>
  <div class="footer-main">
    <div class="footer-content">
      <p>PPmusic</p>
      <div class="link">
        <a href="https://github.com/lhmirage">
          <i class="iconfont icongithub" title="欢迎点击^v^"></i>
        </a>
      </div>
    </div>
    <div class="footer-copy">
      Copyright @ 2020-2021 PPmusic 个人演示站. Designed by lhmirage.
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterMain'
}
</script>

<style scoped lang="less">
.footer-main {
  width: 100%;
  background-color: #161e27;
  .footer-content {
    border-bottom: 1px solid #797979;
    p {
      color: #fff;
      padding: 40px 0 40px 20px;
      border-left: 5px solid #fa2800;
      display: inline-block;
    }
    .link {
      padding: 40px 30px 20px 20px;
      float: right;
      i {
        font-size: 18px;
        border: 10px solid #232a31;
        border-radius: 50%;
        margin-left: 10px;
        color: #e7e7e7;
      }
    }
  }
  .footer-copy{
    padding: 5px 0px 10px 20px;
    color: #6d7685;
  }
}
</style>