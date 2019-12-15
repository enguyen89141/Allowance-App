import React, { Component } from 'react'

export default class SignUpPage extends Component {
  render() {
    return (
      <div className="container">
        <form>
          <div>
          <label>
            Name:
          </label>
          <input />
          </div>
          <div>
          <label>
            Email:
          </label>
          <input />
          </div>
          <div>
          <label>
            Email of person receiving allowance:
          </label>
          <input />
          </div>
          <div>
          <button>Sign up!</button>
          </div>
        </form>
      </div>
    )
  }
}