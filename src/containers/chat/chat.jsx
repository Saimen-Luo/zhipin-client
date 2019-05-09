/*
对话聊天的路由组件
*/
import React, { Component } from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { connect } from 'react-redux'

import { sendMsg } from '../../redux/actions'

const Item = List.Item
class Chat extends Component {
    state = {
        content: '',
        isShown: false
    }
    // 在第一次render()之前回调
    componentWillMount() {
        // 初始化表情列表数据
        const emojis = ['😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀'
            , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
            , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
            , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣']
        this.emojis = emojis.map(emoji => ({ text: emoji }))
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
            this.setState({
                content: '',
                isShown: false // 点击发送隐藏emojis
            })
        }

    }

    toggleShow = () => {
        const isShown = !this.state.isShown
        this.setState({ isShown })
        if (isShown) {
            setTimeout(() => {
                // 异步手动派发resize事件，解决表情列表显示的bug
                window.dispatchEvent(new Event('resize'))
            }, 0);
        }
    }

    componentDidMount() {
        // 初始显示列表 自动滑倒最底部
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate() {
        // 更新显示列表 自动滑倒最底部
        window.scrollTo(0, document.body.scrollHeight)
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
                <NavBar
                    // 添加返回图标
                    icon={<Icon type='left' />}
                    // 固定Navbar
                    className='sticky-header'
                    // 点击左边图标返回
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                {/* 使消息不被盖住 */}
                <List style={{ marginTop: 50, marginBottom: 50 }}>
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
                    <InputItem
                        value={this.state.content}
                        onChange={(val) => this.setState({ 'content': val })}
                        placeholder=" 请输入"
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{ fontSize: 12, marginRight: 5 }}>{this.emojis[0].text}</span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                        }
                        onFocus={() => this.setState({ isShown: false })}
                    />
                    {this.state.isShown ? (
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                // input获取焦点输入时隐藏emojis
                                this.setState({ content: this.state.content + item.text })
                            }}
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg }
)(Chat)