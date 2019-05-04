// register组件
import React, { Component } from 'react'

// 1. 引入用到的组件
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import { connect } from 'react-redux'

// 4.1 引入Logo组件
import Logo from '../../components/logo/logo'
import { register } from '../../redux/actions'

// 2. ListItem是List中的Item
const ListItem = List.Item

class Register extends Component {
    // 6. 设置state
    state = {
        username: '', // 用户名
        password: '', // 密码
        password2: '', // 确认密码
        // 9.2.2 设置一个初始值
        type: 'employee', // 用户类型 boss/employee 
    }
    register = () => {
        this.props.register(this.state)

    }
    // 8. handleChange函数,[name]要加中括号取变量的值, setState
    handleChange(name, val) {
        this.setState({
            [name]: val
        })
    }
    // 10.2 toLogin方法,this.props.history.replace跳转
    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        // 9.2.3 读state的type的值,注意书写位置,写在render里面,return外面
        const { type } = this.state
        const { msg } = this.props.user
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
                        {msg ? <div className='err-msg'>{msg}</div> : null}
                        {/* 5.2 嵌套InputItem */}
                        <WhiteSpace />
                        {/* 7. 各个state元素的onChange事件,参考文档 会传递一个value,变化的值; 交给handleChange */}
                        <InputItem placeholder='请输入用户名' onChange={val => { this.handleChange('username', val) }}>用户名:</InputItem>
                        {/* 5.3 间隔 */}
                        <WhiteSpace />
                        <InputItem placeholder='请输入密码' type='password' onChange={val => { this.handleChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='确认密码' type='password' onChange={val => { this.handleChange('password2', val) }}>确认密码:</InputItem>
                        <WhiteSpace />
                        {/* 5.4 ListItem */}
                        <ListItem>
                            {/* 5.5 三个行内元素 */}
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* 9.1 radio也有onChange事件,不传递val,把val直接写为boss/employee */}
                            {/* 9.2.1 checked属性,动态设置,相等时为true;需要state的type有初始值 */}
                            <Radio checked={type === 'employee'} onChange={() => { this.handleChange('type', 'employee') }}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'boss'} onChange={() => { this.handleChange('type', 'boss') }}>老板</Radio>
                        </ListItem>
                        <WhiteSpace />
                        {/* 5.6 两个按钮 */}
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace />
                        {/* 10.1 点击 已有账户 按钮跳到 login 界面 */}
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { register }
)(Register)