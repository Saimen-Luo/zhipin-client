/* 大神完善信息容器路由组件 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
class EmployeeInfo extends Component {
    render() {
        return (
            <div>EmployeeInfo</div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(EmployeeInfo)