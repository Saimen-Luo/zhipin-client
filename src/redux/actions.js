/* 
包含n个actionCreator 函数
同步action
异步action
*/
import io from 'socket.io-client'
import {
    reqRegister,
    reqLogin,
    reqUpdate,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api'
import {
    AUTH_SUCCESS,
    ERR_MESSAGE,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'

// 授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误提示的同步action
const errMessage = (msg) => ({ type: ERR_MESSAGE, data: msg })
// 接收用户同步action
const recieveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重制用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
// 接收用户列表的同步action
const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })
// 接收消息列表的同步action
const receiveMsgList = ({ chatMsgs, users, userId }) => ({ type: RECEIVE_MSG_LIST, data: { chatMsgs, users, userId } })
// 接收一条消息的同步action
const receiveMsg = ({ chatMsg, userId }) => ({ type: RECEIVE_MSG, data: { chatMsg, userId } })
// 读取某个聊天信息的同步action
const msgRead = ({ count, to, from }) => ({ type: MSG_READ, data: { count, to, from } })


// 注册异步action
export const register = (user) => {
    const { username, password, password2, type } = user
    // 表单前台验证
    if (!username) {
        return errMessage('用户名不能为空')
    } else if (!password) {
        return errMessage('密码不能为空')
    } else if (password !== password2) {
        return errMessage('密码和确认密码不一致！')
    }

    // 表单前台验证成功，返回一个发ajax请求的异步action
    return async dispatch => {
        // 不传递password2，后台不需要
        const response = await reqRegister({ username, password, type })
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            // 分发授权成功的同步action
            dispatch(authSuccess(result.data))
        } else {
            // 分发错误提示的同步action
            dispatch(errMessage(result.msg))
        }
    }
}

// 登录异步action
export const login = (user) => {
    const { username, password } = user
    // 表单前台验证
    if (!username) {
        return errMessage('用户名不能为空')
    } else if (!password) {
        return errMessage('密码不能为空')
    }

    // 表单前台验证成功，返回一个发ajax请求的异步action
    return async dispatch => {
        // 不传递password2，后台不需要
        const response = await reqLogin({ username, password })
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            // 分发授权成功的同步action
            dispatch(authSuccess(result.data))
        } else {
            // 分发错误提示的同步action
            dispatch(errMessage(result.msg))
        }
    }
}

export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdate(user)
        const result = response.data
        if (result.code === 0) {
            // 分发接收用户的同步action
            dispatch(recieveUser(result.data))
        } else {
            // 分发重制用户的同步action
            dispatch(resetUser(result.msg))
        }

    }
}

// 获取用户异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(recieveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户列表异步action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}

function initIO(dispatch, userId) {
    /* 实现单例：
        1. 创建之前判断，只有没有创建过才创建
        2. 创建之后，保存
    */
    if (!io.socket) {
        io.socket = io('ws://react.learningpurpose.ml:8080')

        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('客户端收到服务端发送的消息', chatMsg)
            // 只分发同步action保存与当前用户相关的消息
            if (userId === chatMsg.from || userId === chatMsg.to) {
                dispatch(receiveMsg({ chatMsg, userId }))
            }
        })
    }
}

// 发送消息异步action
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        console.log('客户端向服务端发送消息', { from, to, content })
        io.socket.emit('sendMsg', { from, to, content })
    }
}

// 获取消息列表的异步工具函数
async function getMsgList(dispatch, userId) {
    initIO(dispatch, userId)
    const response = await reqChatMsgList()
    const result = response.data
    if (result.code === 0) {
        const { chatMsgs, users } = result.data
        // 分发同步action
        dispatch(receiveMsgList({ chatMsgs, users, userId }))

    }
}

// 更新消息未读状态的异步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if (result.code === 0) {
            const count = result.data
            dispatch(msgRead({ count, to, from }))
        }
    }
}