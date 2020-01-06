import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import AllowanceContext from '../../contexts/AllowanceContext'
import AllowanceApiService from '../../services/allowance-api-service'
export default class LoginForm extends Component {
  static contextType = AllowanceContext

  static defaultProps = {
    onLoginSuccess: () => { }
  }

  state = { 
    error: null 
  }


  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { username, password } = ev.target
    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        AllowanceApiService.saveAccountAndLoginId(res.account, res.login_id)
        this.props.onLoginSuccess()
        })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div>
          <label htmlFor='LoginForm__username'>
            Username:
          </label>
          <input
            required
            name='username'
            id='LoginForm__username'/>
        </div>
        <div>
          <label htmlFor='LoginForm__password'>
            Password:
          </label>
          <input
            required
            name='password'
            type='password'
            id='LoginForm__password'/>
        </div>
        <div className="button">
          <button type='submit'>
            Login
        </button>
        </div>
      </form>
    )
  }
}
