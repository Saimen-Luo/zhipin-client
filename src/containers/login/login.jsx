// login组件
import React, { Component } from 'react'

// 1. 引入用到的组件
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
// 4.1 引入Logo组件
import Logo from '../../components/logo/logo'

export default class login extends Component {
    // 6. 设置state
    state = {
        username: '', // 用户名
        password: '', // 密码
    }
    login = () => {
        console.log(this.state);

    }
    // 8. handleChange函数,[name]要加中括号取变量的值, setState
    handleChange(name, val) {
        this.setState({
            [name]: val
        })
    }
    // 10.2 toRegister方法,this.props.history.replace跳转
    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        return (
            <div>
                {/* 3. 硅谷直聘顶部导航栏 */}
                <NavBar>硅谷直聘</NavBar>
                {/* 4.2 使用Logo组件 */}
                <Logo />
                {/* 5. 使用WingBlank */}
                <WingBlank>
                    {/* 5.1 嵌套List */}
                    <List>
                        {/* 5.2 嵌套InputItem */}
                        <WhiteSpace />
                        {/* 7. 各个state元素的onChange事件,参考文档 会传递一个value,变化的值; 交给handleChange */}
                        <InputItem placeholder='请输入用户名' onChange={val => { this.handleChange('username', val) }}>用户名:</InputItem>
                        {/* 5.3 间隔 */}
                        <WhiteSpace />
                        <InputItem placeholder='请输入密码' type='password' onChange={val => { this.handleChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        {/* 5.6 两个按钮 */}
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace />
                        {/* 10.1 点击 还没有账户 按钮跳到 register 界面 */}
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}