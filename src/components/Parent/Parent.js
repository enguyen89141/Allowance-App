import React, { Component } from 'react';
import AllowanceContext from '../../contexts/AllowanceContext'
import AllowanceApiService from '../../services/allowance-api-service'
import ChildList from '../ChildList/ChildList'
import config from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Parent extends Component {
  static contextType = AllowanceContext
  state = {
    emailSent: false
  }
  componentDidMount() {
    const login_id = window.sessionStorage.getItem('login_id')
    this.context.clearError()
    AllowanceApiService.getParent(login_id)
      .then(this.context.setParent)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearParent()
  }
  addChild = e => {
    e.preventDefault()
    const parent = this.context.parent
    const { email_to } = e.target
    this.sendFeedback(
      config.REACT_APP_EMAILJS_TEMPLATEID,
      parent.email,
      config.REACT_APP_EMAILJS_RECEIVER,
      config.REACT_APP_EMAILJS_USERID,
      `https://allowance-app.enguyen89141.now.sh/parent/${parent.id}`,
      email_to.value,
      parent.first_name
    )
    email_to.value = ''
    this.setState({ emailSent: true})
  }
  sendFeedback(templateId, senderEmail, receiverEmail, user, link, email_to, from_name) {
    window.emailjs
      .send('default_service', templateId, {
        senderEmail,
        receiverEmail,
        link,
        email_to,
        from_name
      },
        user
      )
      .catch(err => console.error('Failed to send email. Error: ', err));
  }

  render() {
    const parent = this.context.parent
    const { emailSent } = this.state
    return (
      <div>
        {parent &&
          <>
            <p>Hello, {parent.first_name + ' ' + parent.last_name}</p>
            <ChildList
              history={this.props}
            />
            <p>Add another allowance receiver here: </p>
            <form onSubmit={this.addChild}>
              <label htmlFor='Receiver_email'>
                Email:
              </label>
              <input
                required
                type='email'
                name='email_to'
                id='Receiver_email' />
                <br />
              <button>Send email <FontAwesomeIcon icon="paper-plane" /></button>
              {emailSent ?
                <p>Email has been sent!</p>
                : null }
            </form>
          </>
        }
      </div>
    )
  }
}