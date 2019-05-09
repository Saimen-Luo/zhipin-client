// Message组件
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

/* 得到每个组的lastMsg组成的数组 */
function getLastMsgs(chatMsgs, userId) {
    // 找出每组聊天的lastMsg，并用一个容器对象来保存 {chat_id:lastMsg}
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        if (msg.to === userId && !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }

        // 得到msg的标识id
        const chatId = msg.chat_id
        // 获取已保存的当前chaiId组的lastMsg
        let lastMsg = lastMsgObjs[chatId]
        if (!lastMsg) { // 如果没有，保存
            lastMsgObjs[chatId] = msg
        } else {
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            if (msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg
            }
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    })
    // 得到所有lastMsg的数组
    const lastMsgs = Object.values(lastMsgObjs)
    // 对数组进行排序
    lastMsgs.sort(function (m1, m2) {
        return m2.create_time - m1.create_time
    })
    // 返回排序后的数组
    return lastMsgs
}

class Message extends Component {
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat

        // 对chatMsgs进行分组，按chat_id分组
        const lastMsgs = getLastMsgs(chatMsgs, user._id)

        return (
            <List style={{ marginBottom: 50, marginTop: 50 }}>
                {lastMsgs.map(msg => {
                    const targetUserId = msg.to === user._id ? msg.from : msg.to
                    const targetUser = users[targetUserId]
                    return (
                        <Item
                            key={msg._id}
                            extra={<Badge text={msg.unReadCount} />}
                            thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                            arrow='horizontal'
                            onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                        >
                            {msg.content}
                            {/* 显示对方的头像 */}
                            <Brief>{targetUser.username}</Brief>
                        </Item>
                    )
                })}
            </List>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    {}
)(Message)