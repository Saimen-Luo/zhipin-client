/* 
包含n个actionCreator 函数
同步action
异步action
*/
import { reqRegister } from '../api'
import {
    AUTH_SUCCESS,
    ERR_MESSAGE
} from './action-types'

// 授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误提示的同步action
const errMessage = (msg) => ({ type: ERR_MESSAGE, data: msg })

// 注册异步action
export const register = (user) => {
    const { username, password, password2, type } = user
    // 表单前台验证
    if (!username) {
        return errMessage('用户名不能为空')
    }else if (!password) {
        return errMessage('密码不能为空')
    }else if (password !== password2) {
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