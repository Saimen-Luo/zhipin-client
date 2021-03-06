import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'

// 1. 从react-redux引入Provider
import { Provider } from 'react-redux'
// 2. 引入store
import store from './redux/store'

import './assets/css/index.less'

// 引入socket.io
// import './test/test'

ReactDom.render((
    // 3. 把路由器放到Provider中,Provider传递store属性
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'))