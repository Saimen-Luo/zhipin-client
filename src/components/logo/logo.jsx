// 1. 引入React
import React from 'react'
// 3. 引入logo图片
import logo from './logo.png'
// 4. 引入less样式
import './logo.less'

// 2. 向外暴露Logo组件
export default function Logo() {
    return (
        <div className='logo-container'>
            <img src={logo} alt="logo" className='logo-img'/>
        </div>
    )
}