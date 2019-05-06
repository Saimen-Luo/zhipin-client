// Employee组件
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Employee extends Component {
    render() {
        return (
            <div>Employee</div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Employee)