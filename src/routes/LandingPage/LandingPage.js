import React, {Component} from 'react'

export default class LandingPage extends Component {
  render() {
    return(
      <div className="LandingPage">
        <h2>Hello and thank you for visiting my web app that helps parents teach their kids financial responsibility.</h2>
        <h4>Although the app seems to be catered to those with children it's really made for any one that wants to provide some sort of incentive to anyone for completing differently ranked tasks.</h4>
        <p>When you sign up you'll be able to enter in an email addres, name, and message for a person you want to create an allowance allocation for.</p>
        <p>That person will be sent an email to a link where they will be able to create an account as well.</p>
        <p>Only once both accounts are active will you be able to fully utilize the web application where the allowance giver can create tasks and set their worth and the receiver can mark tasks as done and allowance has been received.</p>
        <p>For test purposes, you can use the account REPLACE WITH TEST ACCOUNT AND PASSWORD.</p>
      </div>
    )
  }
}