// main组件
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import BossInfo from '../boss-info/boss-info'
import EmployeeInfo from '../employee-info/employee-info'

export default class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/employeeinfo' component={EmployeeInfo}></Route>
                </Switch>
            </div>
        )
    }
}