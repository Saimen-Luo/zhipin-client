/* 大神完善信息容器路由组件 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'

class EmployeeInfo extends Component {
    state = {
        header: '', // 头像名称
        post: '', // 职位
        info: '', // 个人或职位简介
    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    save = () => {
        console.log(this.state);

    }
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    render() {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem onChange={val => { this.handleChange('post', val) }}>求职岗位：</InputItem>
                <TextareaItem title='个人介绍：' rows={3} onChange={val => { this.handleChange('info', val) }}></TextareaItem>
                <Button type='primary' onClick={this.save}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(EmployeeInfo)