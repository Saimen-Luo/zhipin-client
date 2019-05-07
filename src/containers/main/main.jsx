// main组件
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import EmployeeInfo from '../employee-info/employee-info'
import Boss from '../boss/boss'
import Employee from '../employee/employee'
import Message from '../message/message'
import Personal from '../personal/personal'
import NoFound from '../../components/no-found/no-found'
import NavFooter from '../../components/nav-footer/nav-footer'

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions'

class Main extends Component {
    // 给数组对象添加属性
    // 包含所有导航组件的相关信息
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: ' 大神列表',
            icon: 'employee',
            text: ' 大神',
        },
        {
            path: '/employee', // 路由路径
            component: Employee,
            title: ' 老板列表',
            icon: 'boss',
            text: ' 老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: ' 消息列表',
            icon: 'message',
            text: ' 消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: ' 用户中心',
            icon: 'personal',
            text: ' 个人',
        }
    ]
    componentDidMount() {
        // 如果cookie中有userId(登录过)，但没登录（redux中没有_id），发请求获取对应的user
        const userId = Cookies.get('userId')
        const { _id } = this.props.user
        /* todo */
        if (userId && !_id) {
            this.props.getUser()
        }



    }
    render() {
        // 读取cookie中的userId
        const userId = Cookies.get('userId')

        // 如果没有userId，重定向到login
        // 后台登录路由需要返回 userId cookie，否则会造成login死循环
        // Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
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

        const { navList } = this
        const path = this.props.location.pathname // 请求的路径
        const currentNav = navList.find(nav => nav.path === path) // 得到与navList匹配的路径，可能没有

        /* 决定哪个路由隐藏
            如果usere.type为 boss，第2个隐藏
            如果usere.type为 employee，第1个隐藏
        */
        if (currentNav) {
            if (user.type === 'boss') {
                navList[1].hide = true
            } else {
                navList[0].hide = true
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map((nav, index) => <Route path={nav.path} component={nav.component} key={index}></Route>)
                    }
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/employeeinfo' component={EmployeeInfo}></Route>
                    <Route component={NoFound}></Route>
                </Switch>
                {currentNav ? <NavFooter navList={navList} /> : null}
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { getUser }
)(Main)

/*
1. 实现自动登录：
    1. 如果cookie中有userId(登录过)，但没登录（redux中没有_id），发请求获取对应的user
    2. 如果cookie中没有userId，重定向到login
2. 如果已经登录：
    根据user的type和header来计算出一个重定向的路由路径，并自动重定向

*/