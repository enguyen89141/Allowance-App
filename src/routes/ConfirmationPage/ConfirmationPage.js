import React, { Component } from 'react'
export default class ConfirmationPage extends Component {
  render() {
    return (
      <div>
      <h2>Thank you for signing up.</h2>
      <p>An email has been sent to the address you specified so they can sign up to view tasks you assign.</p>
      <p>Please click login at the top to begin adding in tasks.</p>
    </div>
    )
  }
}