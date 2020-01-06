import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TokenService from '../../services/token-service'
import AllowanceContext from '../../contexts/AllowanceContext'
import AllowanceApiService from '../../services/allowance-api-service'

export default class Header extends Component {
  static contextType = AllowanceContext

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    AllowanceApiService.clearAccountAndLoginId()
  }

  renderLoggedOutLinks() {
    return (
      <div className="Header_logged_in">
        <Link
          to={'/home'}>
          <h2>Allowance App!</h2>
        </Link>
        <Link
          onClick={this.handleLogoutClick}
          to='/login'>
          Logout
          </Link>
      </div>
    )
  }

  renderLoggedInLinks() {
    return (
      <div className="Header_logged_out">
        <Link
          to={'/'}>
          <h2>Allowance App!</h2>
        </Link>
        <p><Link
          to='/login'>
          Login
          </Link>
        </p>
        <p>
          <Link
            to='/signup'>
            Sign Up!
            </Link>
        </p>
      </div>
    )
  }


  render() {
    const AuthButton = withRouter(() => (
      TokenService.hasAuthToken() ?
        <p>
          {this.renderLoggedOutLinks()}
        </p>
        : <p>
          {this.renderLoggedInLinks()}
        </p>
    ))
    return (
      <div className="header">
        
        <h3>
          <AuthButton />
        </h3>
      </div>
    )
  }
}