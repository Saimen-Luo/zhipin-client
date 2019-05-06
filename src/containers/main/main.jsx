// main组件
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import BossInfo from '../boss-info/boss-info'
import EmployeeInfo from '../employee-info/employee-info'
import { getRedirectTo } from '../../utils'

class Main extends Component {
    componentDidMount() {
        // 如果cookie中有userId(登录过)，但没登录（redux中没有_id），发请求获取对应的user
        const userId = Cookies.get('userId')
        const { _id } = this.props.user
        /* todo */



    }
    render() {
        // 读取cookie中的userId
        const userId = Cookies.get('userId')

        // 如果没有userId，重定向到login
        if (!userId) {
            return <Redirect to='login' />
        }

        // 如果有userId，读取redux中的user状态
        const { user } = this.props
        // 如果redux没有_id，返回null 不做任何显示
        if (!user._id) {
            return null
        } else {
            // 如果有_id，显示对应界面
            // 如果请求根路径，根据user的type和header来计算出一个重定向的路由路径，并自动重定向
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path} />
            }
        }



        /* const { user } = this.props
        if (!user._id) {
            // 通过_id判断用户是否登录，无_id则重定向到登录界面；适用于用户未登录通过地址访问其他路由 和 cookies被删除等情况
            return <Redirect to='login' />
        } */
        return (
            <div>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/employeeinfo' component={EmployeeInfo}></Route>
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user })
)(Main)

/*
1. 实现自动登录：
    1. 如果cookie中有userId(登录过)，但没登录（redux中没有_id），发请求获取对应的user
    2. 如果cookie中没有userId，重定向到login
2. 如果已经登录：
    根据user的type和header来计算出一个重定向的路由路径，并自动重定向

*/