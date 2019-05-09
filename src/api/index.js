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

// 获取指定类型的用户列表
export const reqUserList = (type) => ajax('/userlist', { type })

// 获取当前用户的聊天信息列表
export const reqChatMsgList = () => ajax('/msglist')

// 标记聊天信息为已读
export const reqReadMsg = (from) => ajax('/readmsg', { from }, 'POST')