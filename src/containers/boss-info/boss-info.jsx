/* 老板完善信息容器路由组件 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'

class BossInfo extends Component {
    render() {
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector />
                <InputItem>招聘职位：</InputItem>
                <InputItem>公司名称：</InputItem>
                <InputItem>职位薪资：</InputItem>
                <TextareaItem title='职位要求：' rows={3}></TextareaItem>
                <Button type='primary'>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(BossInfo)