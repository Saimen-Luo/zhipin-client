/* 选择用户头像的ui组件 */

// HeaderSelector组件
import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'

export default class HeaderSelector extends Component {
    constructor(props) {
        super(props)
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: `头像${i + 1}.png`,
                // webpack支持commonjs
                icon: require(`./images/头像${i + 1}.png`)
            })
        }
    }
    render() {
        const listHeadr = '请选择头像'
        return (
            <List renderHeader={() => listHeadr}>
                <Grid data={this.headerList} columnNum={5}></Grid>
            </List>
        )
    }
}