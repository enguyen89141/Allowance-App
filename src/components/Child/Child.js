import React, { Component } from 'react';
import AllowanceContext from '../../contexts/AllowanceContext'
import AllowanceApiService from '../../services/allowance-api-service'
import TaskList from '../TaskList/TaskList'

export default class Child extends Component {
  static contextType = AllowanceContext
  componentDidMount() {
    const login_id = window.sessionStorage.getItem('login_id')
    this.context.clearError()
    AllowanceApiService.getChild(login_id)
      .then(this.context.setChild)
      .catch(this.context.setError)
  }
  componentWillUnmount() {
    this.context.clearChild()
  }

  render() {
    const child = this.context.child
    const tasks = this.context.tasks
    return (
      <div>
        {child &&
          <>
            <p>Hello, {child.first_name + ' ' + child.last_name}</p>
            <TaskList
              child_id={child.id}
              tasks={tasks}
            />
          </>
        }

      </div>
    )
  }
}