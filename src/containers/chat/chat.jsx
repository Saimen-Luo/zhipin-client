/*
对话聊天的路由组件
*/
import React, { Component } from 'react'
import { NavBar, List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'

import { sendMsg } from '../../redux/actions'

const Item = List.Item
class Chat extends Component {
    state = {
        content: ''
    }
    handleSend = () => {
        // 收集数据
        const from = this.props.user._id
        const to = this.props.match.params.userId
        const content = this.state.content.trim()
        // 发送消息
        if (content) {
            this.props.sendMsg({ from, to, content })
            // 清空输入框
            this.setState({ content: '' })
        }

    }
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat

        // 计算当前聊天chat_id
        const meId = user._id
        if (!users[meId]) { // 如果还没有获取到数据，直接不做任何显示，避免的对话界面刷新报错
            return null
        }
        const targetId = this.props.match.params.userId
        const chatId = [meId, targetId].sort().join('_')

        // 得到目标用户的icon图标对象
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

        // 对chatMsgs进行过滤
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        return (
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    {
                        msgs.map(msg => {
                            if (targetId === msg.from) { // 别人发给我的
                                return (
                                    <Item thumb={targetIcon} key={msg._id}>
                                        {msg.content}
                                    </Item>
                                )
                            } else { // 我发给别人的
                                return (
                                    <Item className='chat-me' extra=' 我' key={msg._id}>
                                        {msg.content}
                                    </Item>
                                )
                            }
                        })
                    }



                </List>
                <div className='am-tab-bar'>
                    <InputItem value={this.state.content} onChange={(val) => this.setState({ 'content': val })} placeholder=" 请输入" extra={<span onClick={this.handleSend}>发送</span>} />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg }
)(Chat)