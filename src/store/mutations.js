// 用户的个人信息
export const setProfile = (state, payload) => {
  state.profile = payload
}

// 设置登录状态
export const setLoginStatus = (state, payload) => {
  state.loginStatus = payload
}

// 设置历史搜索记录
export const setHistorySearch = (state, payload) => {
  let index = state.historySearch.indexOf(payload)
  if (index !== -1) {
    state.historySearch.splice(index, 1)
    state.historySearch.unshift(payload)
  } else {
    state.historySearch.unshift(payload)
  }
}

// 删除历史搜索记录某一项
export const deleteHistorySearchItem = (state, index) => {
  state.historySearch.splice(index, 1)
}

// 清空搜索历史
export const clearHistorySearch = (state, payload) => {
  state.historySearch = []
}