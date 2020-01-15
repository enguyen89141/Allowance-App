import React, { Component } from 'react';
import AllowanceContext from '../../contexts/AllowanceContext'
import AllowanceApiService from '../../services/allowance-api-service'
import TaskList from '../TaskList/TaskList'

export default class ChildList extends Component {
  static contextType = AllowanceContext

  state = {
    selectedChild: ''
  }

  componentDidMount() {
    const { parent } = this.context
    this.context.clearError()
    AllowanceApiService.getChildrenForParent(parent)
      .then(this.context.setChildren)
      .catch(this.context.setError)
  }
  componentWillUnmount() {
    this.context.clearChildren()
  }

  renderChildrenList() {
    const child = this.context.children
    if (child.length === 1) {
      return <>
        <p>Task list for: {child[0].first_name + ' ' + child[0].last_name}</p>
        <TaskList
          child_id={child[0].id}
          history={this.props}
        />
      </>
    } else {
      return <div>
        <span>Task list for: </span>
        <select
          value={this.state.selectedChild}
          onChange={(e) => this.setState({ selectedChild: e.target.value })}>
          <option value={''}>Please select a person: </option>
          {child.map(child =>
            <option key={child.value} value={child.id}>{child.first_name + ' ' + child.last_name}</option>)}
        </select>
        {this.state.selectedChild &&
          <TaskList
            child_id={this.state.selectedChild}
            taskList={this.context.tasks}
            history={this.props}
          />}

      </div>
    }
  }
  render() {
    const children = this.context.children
    return (
      <>
        {children && this.renderChildrenList()}
      </>
    )
  }
}