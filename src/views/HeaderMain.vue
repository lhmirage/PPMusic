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
          <router-link to="/home" tag="a">发现音乐</router-link>
        </li>
        <li>
          <router-link to="/rank" tag="a">排行榜</router-link>
        </li>
        <li>
          <router-link to="/song_sheet" tag="a">歌单</router-link>
        </li>
        <li>
          <router-link to="/singer" tag="a">歌手</router-link>
        </li>
        <li>
          <router-link to="/video" tag="a">视频</router-link>
        </li>
        <li>
          <router-link to="/mv" tag="a">MV</router-link>
        </li>
      </ul>
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