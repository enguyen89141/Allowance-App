import React, {Component} from 'react'

export default class LandingPage extends Component {
  render() {
    return(
      <div className="LandingPage">
        <h2>Hello and thank you for visiting my web app that helps parents teach their kids financial responsibility.</h2>
        <h4>Although the app seems to be catered to those with children it's really made for any one that wants to provide some sort of incentive to anyone for completing differently ranked tasks.</h4>
        <p>When you sign up you'll be able to enter in an email address for a person you want to create an allowance allocation for.</p>
        <p>That person will be sent an email to a link where they will be able to create an account as well.</p>
        <p>For test purposes, you can use the account username: enguyen89141 and password: Password1!.</p>
        <p>Status Information: Open means the task hasn't been started. Pending means the task is pending reward. Completed means the reward has been distributed.</p>
      </div>
    )
  }
}