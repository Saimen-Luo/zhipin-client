// 包含N个reducers函数，根据老的state和指定的action返回新的state

// 3. 从redux引入combineReducers函数
import { combineReducers } from 'redux'

// 1. reducers函数
function xxx(state=0,action) {
    return state
}

function yyy(state=0,action) {
    return state
}

// 2. 向外暴露组合后的reducers对象
export default combineReducers({
    xxx,
    yyy
})

// 向外暴露状态的结构 {xxx:0, yyy:0}