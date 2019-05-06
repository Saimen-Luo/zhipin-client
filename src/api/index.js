/* 包含了所有的接口请求的函数的模块
    返回promise 对象
*/
import ajax from './ajax'

// 用户注册接口
export const reqRegister = (user) => ajax('/register', user, "POST")

// 登录接口
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, "POST")

// 更新用户信息接口
export const reqUpdate = (user) => ajax('/update', user, "POST")

// 获取用户信息接口
export const reqUser = () => ajax('/user')