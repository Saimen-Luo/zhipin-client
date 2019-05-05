// 包含N个reducers函数，根据老的state和指定的action返回新的state

// 3. 从redux引入combineReducers函数
import { combineReducers } from 'redux'

import {
    AUTH_SUCCESS,
    ERR_MESSAGE
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
        default:
            return state
    }
}

// 2. 向外暴露组合后的reducers对象
export default combineReducers({
    user
})

// 向外暴露状态的结构 {user:{}}