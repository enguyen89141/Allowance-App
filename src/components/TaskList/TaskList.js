import React, { Component } from 'react';
import AllowanceContext from '../../contexts/AllowanceContext'
import AllowanceApiService from '../../services/allowance-api-service'
// need to solve issue with chaing taskslists 
// possibly use a setTimeout and pass it as a prop 
// https://stackoverflow.com/questions/30803440/delayed-rendering-of-react-components
// or look into promises as a way to resolve
export default class TaskList extends Component {
  static contextType = AllowanceContext
  state = {
    name: '',
    difficulty: '',
    error: null,
    tasks: []
  }
  handleChildUpdate(e, task, index) {
    e.preventDefault()
    AllowanceApiService.updateTaskForChild(task, 'pending', index)
    let tasksToUpdate = this.state.tasks
    tasksToUpdate[index].current_status = 'pending'
    this.setState({ tasks: tasksToUpdate })
  }
  handleParentUpdate(e, task, index) {
    e.preventDefault()
    AllowanceApiService.updateTaskForChild(task, 'completed')
    let tasksToUpdate = this.state.tasks
    tasksToUpdate[index].current_status = 'completed'
    this.setState({ tasks: tasksToUpdate })
  }
  handleDelete(e, task) {
    e.preventDefault()
    AllowanceApiService.deleteTask(task.id)
    let tasksToUpdate = this.state.tasks.filter(i => i.id !== task.id)
    this.setState({ tasks: tasksToUpdate })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const taskName = this.state.name
    const difficulty = parseInt(this.state.difficulty)
    if (taskName.length === 0) {
      this.setState({ error: 'Task name cannot be empty' })
    } else if (isNaN(difficulty)) {
      this.setState({ error: 'Please select a difficulty level' })
    } else {
      const newTask = {
        name: this.state.name,
        difficulty: this.state.difficulty,
        reward: this.state.difficulty * 2,
        child_id: this.props.child_id
      }
      AllowanceApiService.postTask(newTask)
        .then(this.context.addTask)
        .then(this.setState({
          name: '',
          difficulty: ''
        }))
        .catch(this.context.setError)
    }
  }
  renderTaskListForChild() {
    const { tasks = [] } = this.state
    if (tasks.length === 0) {
      return <div>
        <h2>Currently waiting on tasks to be added!</h2>
      </div>
    } else {
      return <div>
        {tasks.map((task, index) => {
          return task.current_status === 'open' ?
            <>
              <p>Task: {task.name}</p>
              <p>Difficulty: {task.difficulty}</p>
              <p>Reward: ${task.reward}</p>
              <p>Current Status: {task.current_status} <button onClick={e => this.handleChildUpdate(e, task, index)}>Update to pending!</button> </p>
            </>
            :
            <>
              <p>Task: {task.name}</p>
              <p>Difficulty: {task.difficulty}</p>
              <p>Reward: ${task.reward}</p>
              <p>Current Status: {task.current_status} </p>
            </>
        }
        )}
      </div>
    }
  }
  renderTaskListForParent() {
    const { error } = this.state
    const { tasks = [] } = this.state
    return <div>
      {tasks.map((task, index) => {
        return task.current_status === 'pending' ?
          <>
            <p>Task: {task.name}</p>
            <p>Difficulty: {task.difficulty}</p>
            <p>Reward: ${task.reward}</p>
            <p>Current Status: {task.current_status} <button onClick={e => this.handleParentUpdate(e, task, index)}>Update to completed!</button> </p>
            <button onClick={e => this.handleDelete(e, task, index)}>Delete</button>
          </>
          :
          <>
            <p>Task: {task.name}</p>
            <p>Difficulty: {task.difficulty}</p>
            <p>Reward: ${task.reward}</p>
            <p>Current Status: {task.current_status} </p>
            <button onClick={e => this.handleDelete(e, task, index)}>Delete</button>
          </>
      }
      )}
      <form onSubmit={e => this.handleSubmit(e)}>
        <h3>Add a new task!</h3>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <label>Name:</label>
        <input
          name="name"
          value={this.state.name}
          onChange={e => this.handleChange(e)} />
        <label>Difficulty:</label>
        <select
          value={this.state.difficulty}
          onChange={e => this.setState({ difficulty: e.target.value })}>
          <option></option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <label>Reward: ${this.state.difficulty && this.state.difficulty * 2}</label>
        <button type="submit">Add</button>
      </form>
    </div>

  }
  componentDidUpdate(prevProps) {
    if (this.props.child_id !== prevProps.child_id || this.props.tasks !== prevProps.tasks || this.props.taskList !== prevProps.taskList) {
      const child_id = this.props.child_id
      AllowanceApiService.getTasksForChild(child_id)
        .then(tasks => {
          this.setState({ tasks })
        })
        .catch(this.context.setError)
      this.renderTaskListForParent()
    }
  }
  componentDidMount() {
    const { child_id } = this.props
    AllowanceApiService.getTasksForChild(child_id)
      .then(tasks => {
        this.setState({ tasks })
      })
      .catch(this.context.setError)
  }
  render() {
    let content
    const account = window.sessionStorage.getItem('account')
    if (account === '0') {
      content = this.renderTaskListForParent()
    } else if (account === '1') {
      content = this.renderTaskListForChild()
    }
    return (
      <>
        {content}
      </>
    )
  }
}