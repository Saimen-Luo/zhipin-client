// NavFooter组件
import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render() {
        let { navList, unReadCount } = this.props
        const path = this.props.location.pathname
        navList = navList.filter(nav => !nav.hide)
        return (
            <TabBar>
                {navList.map((nav, index) => (
                    <Item
                        key={nav.path}
                        badge={nav.path === '/message' ? unReadCount : 0}
                        title={nav.text}
                        icon={{ uri: require(`./images/${nav.icon}.png`) }}
                        selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`) }}
                        selected={nav.path === path}
                        onPress={() => this.props.history.replace(nav.path)}
                    />
                ))}
            </TabBar>
        )
    }
}

/* 
希望在非路由组件使用路由库的api？
    使用 react-router-dom 的 withRouter 方法
*/
export default withRouter(NavFooter)