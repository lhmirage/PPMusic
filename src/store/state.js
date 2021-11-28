const state = {
  // 用户的个人信息
  profile: JSON.parse(window.localStorage.getItem("profile")) || null

}

export default state