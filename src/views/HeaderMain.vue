<template>
  <div class="header-main">
    <div class="box">
      <div class="logo">
        <router-link to="/home"
                     tag="a">
          <img src="../assets/images/logo_black.png"
               alt="logo">
        </router-link>
      </div>
      <ul>
        <li>
          <router-link to="/home"
                       tag="a">发现音乐</router-link>
        </li>
        <li>
          <router-link to="/rank"
                       tag="a">排行榜</router-link>
        </li>
        <li>
          <router-link to="/song_sheet"
                       tag="a">歌单</router-link>
        </li>
        <li>
          <router-link to="/singer"
                       tag="a">歌手</router-link>
        </li>
        <li>
          <router-link to="/video"
                       tag="a">视频</router-link>
        </li>
        <li>
          <router-link to="/mv"
                       tag="a">MV</router-link>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont iconsearch"
           @click="openSearch"></i>
      </div>
      <div class="user">
        <router-link to="/login"
                     tag="a"
                     v-if="!profile">登录</router-link>
        <div v-if="profile"
             class="profile-login">
          <div class="avatar">
            <img :src="profile.avatarUrl"
                 alt="">
          </div>
          <div class="user-info">
            <el-dropdown trigger="click"
                         @command="handleCommand">
              <span class="el-dropdown-link">
                {{profile.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="profile-el">
                  <i class="iconfont iconmine"></i>个人主页
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont icondengji"></i>我的等级
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont iconshezhi"></i>个人设置
                </el-dropdown-item>
                <el-dropdown-item command="sign-out">
                  <i class="iconfont icontuichu"></i>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="search-wrapper">

    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderMain'

}
</script>

<style>
</style>