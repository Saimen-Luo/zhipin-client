// redux最核心的管理对象模块

// 3. 从redux引入createStore函数
// 6.2 从redux引入applyMiddleware函数
import { createStore, applyMiddleware } from 'redux'
// 5. 引入reducers
import reducers from './reducers'
// 6.3 从rredux-thunk引入thunk
import thunk from 'redux-thunk'
// 6.1 从redux-devtools-extension引入composeWithDevTools
import { composeWithDevTools } from 'redux-devtools-extension'

// 1. 向外暴露store对象
// 2. 需要创建store对象
// 4. createStore()需要两个参数,一是reducers 二是composeWithDevTools(applyMiddleware(thunk)) 的返回结果
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))