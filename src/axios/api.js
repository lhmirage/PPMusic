import instance from "./instance"

/**
 * @methods 热搜列表(简略)
 * @params 说明 : 调用此接口,可获取热门搜索列表
 */
 export const getSearchHot = () => instance.get(`/search/hot`)