// 包含N个reducers函数，根据老的state和指定的action返回新的state

// 3. 从redux引入combineReducers函数
import { combineReducers } from 'redux'

import {
    AUTH_SUCCESS,
    ERR_MESSAGE,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    MSG_READ
} from './action-types'

import { getRedirectTo } from '../utils'

const initUser = {
    username: '', // 用户名
    type: '', // 用户类型
    msg: '', // 错误信息
    redirectTo: '', // 重定向的路径
}
// 1. reducers函数
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.data
            return { ...action.data, redirectTo: getRedirectTo(type, header) } // state和action.data里面的属性相同，后面的把前面的覆盖掉了。
        case ERR_MESSAGE:
            return { ...state, msg: action.data } // state和action.data里面的属性相同，后面的把前面的覆盖掉了。
        case RECEIVE_USER:
            return action.data // data是user
        case RESET_USER:
            return { ...initUser, msg: action.data } // 返回initUser（重制，清除了_id，就可以判断用户没有登录） 和错误信息
        default:
            return state
    }
}

// 产生userList状态的reducer
function userList(state = [], action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

// 产生chat状态的reducer
const initChat = {
    users: {}, // 所有用户信息的对象，属性名：userId的值，属性值是 username和header
    chatMsgs: [], // 当前用户所有相关的msg信息的数组
    unReadCount: 0 // 总的未读数量
}

function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs, userId } = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => (
                    preTotal + (!msg.read && msg.to === userId ? 1 : 0)
                ), 0)
            }
        case RECEIVE_MSG:
            const { chatMsg } = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userId ? 1 : 0)
            }
        case MSG_READ:
            const { count, from, to } = action.data
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) { // 需要更新
                        return { ...msg, read: true }
                    } else { // 不需要更新
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}

// 2. 向外暴露组合后的reducers对象
export default combineReducers({
    user,
    userList,
    chat
})

// 向外暴露状态的结构 {user:{}}