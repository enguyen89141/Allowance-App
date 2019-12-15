import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link
          to={'/'}>
          <h2>Allowance App!</h2>
        </Link>
        <Link
          to={'/signup'}>
            <button>Sign Up</button>
          </Link>
        <Link
          to={'/allowancegiver'}>
          <button>Log in (Allowance Giver)</button>
        </Link>
        <Link
          to={'/allowancereceiver'}>
            <button>Log in (Allowance Receiver)</button>
          </Link>
        <button>Log out</button>
      </div>
    )
  }
}