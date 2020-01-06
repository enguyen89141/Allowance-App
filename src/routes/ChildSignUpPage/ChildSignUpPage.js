import React, { Component } from 'react'
import AllowanceContext from '../../contexts/AllowanceContext'
import AllowanceApiService from '../../services/allowance-api-service'

export default class ChildSignUpPage extends Component {
  static contextType = AllowanceContext
  state = {
    error: null,
    login_id: null
  }
  handleSubmit = e => {
    e.preventDefault()
    const { parent_id } = this.props.match.params
    const { username, password, confirm_password, first_name, last_name, email } = e.target
    this.setState({
      error: null
    })
    if (password.value !== confirm_password.value) {
      this.setState({ error: `Passwords don't match` })
    } else {
      AllowanceApiService.postLogin({
        username: username.value,
        password: password.value,
        account: "1"
      })
        .then(res => {
          this.setState({
            login_id: res.id
          })
          AllowanceApiService.postChild({
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            login_id: this.state.login_id,
            parent_id: parent_id
          })
            .then(this.props.history.push('/login'))
        })
    }
  }
  render() {
    const { error } = this.context
    return (
      <div>
        <h3>Hello! Please enter your information to sign up!</h3>
        <form onSubmit={this.handleSubmit}>
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>
          <div>
            <label htmlFor='Child_first_name'>
              First Name:
          </label>
            <input
              required
              name='first_name'
              id='Child_first_name' />
          </div>
          <div>
            <label htmlFor='Child_last_name'>
              Last Name:
          </label>
            <input
              required
              name='last_name'
              id='Child_last_name' />
          </div>
          <div>
            <label htmlFor='email'>
              Email:
          </label>
            <input
              required
              type='email'
              name='email'
              id='Child_email' />
          </div>
          <div>
            <label htmlFor='Child_username'>
              Username:
          </label>
            <input
              required
              name='username'
              id='Child_username' />
          </div>
          <div>
            <label htmlFor='Child_password'>
              Password:
          </label>
            <input
              required
              type='password'
              name='password'
              id='Child_password' />
          </div>
          <div>
            <label htmlFor='Child_confirm_password'>
              Confirm Password:
          </label>
            <input
              required
              type='password'
              name='confirm_password'
              id='SignUp_confirm_pasChild_confirm_passwordsword' />
          </div>
          <div>
            <button>Sign up!</button>
          </div>
        </form>
      </div>
    )
  }
}