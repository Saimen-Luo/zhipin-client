/* 大神完善信息容器路由组件 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'

class EmployeeInfo extends Component {
    render() {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector />
                <InputItem>求职岗位：</InputItem>
                <TextareaItem title='个人介绍：' rows={3}></TextareaItem>
                <Button type='primary'>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(EmployeeInfo)