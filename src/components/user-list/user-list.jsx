/* 显示指定用户列表的UI组件 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

const Body = Card.Body
const Header = Card.Header

export default class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        const { userList } = this.props
        return (
            userList.map(user => (
                <WingBlank key={user._id}>
                    <div>
                        <WhiteSpace />
                        <Card>
                            <Header
                                thumb={require(`../../assets/images/${user.header}.png`)}
                                extra={user.username}
                            />
                            <Body>
                                <div>职位: {user.post}</div>
                                {user.company ? <div>公司: {user.company}</div> : null}
                                {user.salary ? <div>月薪: {user.salary}</div> : null}
                                <div>描述: {user.info}</div>
                            </Body>
                        </Card>
                    </div>
                </WingBlank>
            ))
        )
    }
}