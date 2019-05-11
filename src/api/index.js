/* 包含了所有的接口请求的函数的模块
    返回promise 对象
*/
import ajax from './ajax'

// 用户注册接口
export const reqRegister = (user) => ajax('/zhipin/register', user, "POST")

// 登录接口
export const reqLogin = ({ username, password }) => ajax('/zhipin/login', { username, password }, "POST")

// 更新用户信息接口
export const reqUpdate = (user) => ajax('/zhipin/update', user, "POST")

// 获取用户信息接口
export const reqUser = () => ajax('/zhipin/user')

// 获取指定类型的用户列表
export const reqUserList = (type) => ajax('/zhipin/userlist', { type })

// 获取当前用户的聊天信息列表
export const reqChatMsgList = () => ajax('/zhipin/msglist')

// 标记聊天信息为已读
export const reqReadMsg = (from) => ajax('/zhipin/readmsg', { from }, 'POST')