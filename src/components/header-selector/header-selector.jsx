/* 选择用户头像的ui组件 */

// HeaderSelector组件
import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import { PropTypes } from 'prop-types'

export default class HeaderSelector extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    handleClick = ({ text, icon }) => {
        // console.log(el, index);
        this.setState({
            icon
        })
        this.props.setHeader(text)

    }
    state = {
        icon: null
    }
    constructor(props) {
        super(props)
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: `头像${i + 1}`,
                // webpack支持commonjs
                icon: require(`../../assets/images/头像${i + 1}.png`)
            })
        }
    }
    render() {
        const { icon } = this.state
        const listHeadr = !icon ? '请选择头像' : (
            <div>
                已选择头像
                <img src={icon} alt="header-icon" />
            </div>
        )
        return (
            <List renderHeader={() => listHeadr}>
                <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}></Grid>
            </List>
        )
    }
}