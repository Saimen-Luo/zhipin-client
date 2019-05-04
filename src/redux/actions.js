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

export const register = (user) => {
    return async dispatch => {
        const response = await reqRegister(user)
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