import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TokenService from '../../services/token-service'
import AllowanceContext from '../../contexts/AllowanceContext'
import AllowanceApiService from '../../services/allowance-api-service'
import './Header.css'

export default class Header extends Component {
  static contextType = AllowanceContext

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    AllowanceApiService.clearAccountAndLoginId()
  }

  renderLoggedOutLinks() {
    return (
      <>
        <Link
          to={'/home'}>
          <h2>Allowance App</h2>
        </Link>
        <Link
          onClick={this.handleLogoutClick}
          to='/login'>
          Logout
          </Link>
      </>
    )
  }

  renderLoggedInLinks() {
    return (
      <>
        <Link
          to={'/'}>
          <h2>Allowance App</h2>
        </Link>
        <span><Link
          to='/login'>
          Login
          </Link>
        </span>
        {'  '}
        <span>
          <Link
            to='/signup'>
            Sign Up!
            </Link>
        </span>
      </>
    )
  }


  render() {
    const AuthButton = withRouter(() => (
      TokenService.hasAuthToken() ?
        <>
          {this.renderLoggedOutLinks()}
        </>
        : <>
          {this.renderLoggedInLinks()}
        </>
    ))
    return (
      <div className="Header">
          <AuthButton />
      </div>
    )
  }
}