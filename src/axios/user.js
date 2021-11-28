import instance from "./instance"

/**
 * @methods 手机登录
 * @params phone password
 */
export const login = params => instance.get(`/login/cellphone`, {params})

/**
 * @methods 手机注册
 * @params 说明 : 调用此接口 ,传入手机号码和验证码,密码,昵称, 可注册网易云音乐账号(同时可修改密码)
 * @params 必选参数 : captcha: 验证码; phone : 手机号码; password: 密码; nickname: 昵称
 */
 export const register = params => instance.get(`/register/cellphone`, {params})

 /**
  * @methods 发送验证码
  * @params 说明 : 调用此接口 ,传入手机号码, 可发送验证码
  * @params 必选参数 : phone: 手机号码
  * @params 可选参数 : ctcode: 国家区号,默认86即中国
  */
 export const getCaptcha = phone => instance.get(`/captcha/sent?phone=${phone}`, {})
 
 /**
  * @methods 验证验证码
  * @params 说明 : 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
  * @params 必选参数 : phone: 手机号码; captcha: 验证码
  */
 export const verifyCaptcha = params => instance.get(`/captcha/verify`, {params})

/**
 * @methods 获取用户详情
 * @params 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * @params 必选参数 : uid : 用户 id
 */
 export const getUserDetail = uid => instance.get(`/user/detail?uid=${uid}`, {})

/**
 * @methods 退出登录
 * @params 说明 : 调用此接口 , 可退出登录
 */
 export const logout = () => instance.get(`/logout?timeStamp=${new Date().valueOf()}`)