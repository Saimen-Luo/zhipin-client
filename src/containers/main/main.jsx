// main组件
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import BossInfo from '../boss-info/boss-info'
import EmployeeInfo from '../employee-info/employee-info'

class Main extends Component {
    render() {
        const { user } = this.props
        if (!user._id) {
            // 通过_id判断用户是否登录，无_id则重定向到登录界面；适用于用户未登录通过地址访问其他路由 和 cookies被删除等情况
            return <Redirect to='login' />
        }
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