/* 
包含n个actionCreator 函数
同步action
异步action
*/
import { reqRegister, reqLogin, reqUpdate, reqUser } from '../api'
import {
    AUTH_SUCCESS,
    ERR_MESSAGE,
    RECEIVE_USER,
    RESET_USER
} from './action-types'

// 授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误提示的同步action
const errMessage = (msg) => ({ type: ERR_MESSAGE, data: msg })
// 接收用户同步action
const recieveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重制用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })

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
            dispatch(recieveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}