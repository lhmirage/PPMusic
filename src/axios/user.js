import instance from "./instance"

/**
 * @methods 手机登录
 * @params phone password
 */
export const login = params => instance.get(`/login/cellphone`, {params})

