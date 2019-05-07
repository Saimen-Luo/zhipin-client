// Boss组件
import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserList from '../../components/user-list/user-list'
import { getUserList } from '../../redux/actions'

class Boss extends Component {
    componentDidMount() {
        this.props.getUserList('employee')
    }
    render() {
        return (
            <div>
                <UserList userList={this.props.userList} />
            </div>
        )
    }
}

export default connect(
    state => ({ userList: state.userList }),
    { getUserList }
)(Boss)