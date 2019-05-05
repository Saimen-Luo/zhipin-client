/* 老板完善信息容器路由组件 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions'

class BossInfo extends Component {
    state = {
        header: '', // 头像名称
        post: '', // 职位
        info: '', // 个人或职位简介
        company: '', // 公司名称
        salary: '' // 工资
    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    save = () => {
        // console.log(this.state);
        this.props.updateUser(this.state)

    }
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    render() {
        const { header, type } = this.props.user
        if (header) { // 说明信息已经完善（仅检测header，最好检查多个），跳转页面
            const path = type === 'boss' ? '/boss' : '/employee'
            return <Redirect to={path} />
        }
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem onChange={val => { this.handleChange('post', val) }}>招聘职位：</InputItem>
                <InputItem onChange={val => { this.handleChange('company', val) }}>公司名称：</InputItem>
                <InputItem onChange={val => { this.handleChange('salary', val) }}>职位薪资：</InputItem>
                <TextareaItem title='职位要求：' rows={3} onChange={val => { this.handleChange('info', val) }}></TextareaItem>
                <Button type='primary' onClick={this.save}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(BossInfo)