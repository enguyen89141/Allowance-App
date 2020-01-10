import React, { Component } from 'react'


const AllowanceContext = React.createContext({
  error: null,
  child: null,
  parent: null,
  children: null,
  tasks: [],
  setError: () => {},
  clearError: () => {},
  setParent: () => {},
  clearParent: () => {},
  setChild: () => {},
  setChildren: () => {},
  clearChildren: () => {},
  setTasks: () => {},
  clearTasks: () => {},
  addTask: () => {},
})

export default AllowanceContext

export class AllowanceProvider extends Component {
  state = {
    error: null,
    child: null,
    parent: null,
    children: null,
    tasks: []
  }
  setError = error => {
    console.error(error)
    this.setState({ error })
  }
  clearError = () => {
    this.setState({ error: null })
  }
  clearChildren = () => {
    this.setState({ children: null})
  }
  clearParent = () => {
    this.setState({ parent: null})
  }
  clearChild = () => {
    this.setState({ child: null })
    this.setTasks([])
  }
  clearTasks = () => {
    this.setTasks([])
  }
  setParent = parent => {
    this.setState({ parent })
  }
  setChild = child => {
    this.setState({ child })
  }
  setChildren = children => {
    this.setState({ children })
  }
  setTasks = tasks => {
    this.setState({ tasks })
  }
  addTask = task => {
    this.setTasks([
      ...this.state.tasks,
      task
    ])
  }

  render() {
    const value = {
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      parent: this.state.parent,
      setParent: this.setParent,
      clearParent: this.clearParent,
      child: this.state.child,
      setChild: this.setChild,
      clearChild: this.clearChild,
      children: this.state.children,
      setChildren: this.setChildren,
      clearChildren: this.clearChildren,
      setTasks: this.setTasks,
      tasks: this.state.tasks,
      addTask: this.addTask,
      clearTasks: this.clearTasks,
    }
    return (
      <AllowanceContext.Provider value={value}>
        {this.props.children}
      </AllowanceContext.Provider>
    )
  }
}