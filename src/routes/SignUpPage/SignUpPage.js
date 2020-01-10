import React, { Component } from 'react'
import AllowanceContext from '../../contexts/AllowanceContext'
import AllowanceApiService from '../../services/allowance-api-service'
import config from '../../config'
export default class SignUpPage extends Component {
  static contextType = AllowanceContext

  state = {
    error: null,
    login_id: null,
    link: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password, confirm_password, first_name, last_name, email, email_to } = e.target
    this.setState({
      error: null
    })
    if (password.value !== confirm_password.value) {
      this.setState({ error: `Passwords don't match` })
    } else {
      AllowanceApiService.postLogin({
        username: username.value,
        password: password.value,
        account: "0"
      })
        .then(res => {
          this.setState({
            login_id: res.id
          })
          AllowanceApiService.postParent({
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            login_id: this.state.login_id
          })
            .then(res => {
              this.setState({
                link: `https://allowance-app.enguyen89141.now.sh/parent/${res.id}`
              })
              this.sendFeedback(
                config.REACT_APP_EMAILJS_TEMPLATEID,
                email.value,
                config.REACT_APP_EMAILJS_RECEIVER,
                config.REACT_APP_EMAILJS_USERID,
                this.state.link,
                email_to.value,
                first_name.value
              )
              this.props.history.push('/confirm')
            })
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }
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
    const { error } = this.state
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>
          <div>
            <label htmlFor='SignUp_first_name'>
              First Name:
          </label>
            <input
              required
              name='first_name'
              id='SignUp_first_name' />
          </div>
          <div>
            <label htmlFor='SignUp_last_name'>
              Last Name:
          </label>
            <input
              required
              name='last_name'
              id='SignUp_last_name' />
          </div>
          <div>
            <label htmlFor='email'>
              Email:
          </label>
            <input
              required
              type='email'
              name='email'
              id='SignUp_email' />
          </div>
          <div>
            <label htmlFor='SignUp_username'>
              Username:
          </label>
            <input
              required
              name='username'
              id='SignUp_username' />
          </div>
          <div>
            <label htmlFor='SignUp_password'>
              Password:
          </label>
            <input
              required
              type='password'
              name='password'
              id='SignUp_password' />
          </div>
          <div>
            <label htmlFor='SignUp_confirm_password'>
              Confirm Password:
          </label>
            <input
              required
              type='password'
              name='confirm_password'
              id='SignUp_confirm_password' />
          </div>
          <div>
            <label htmlFor='SignUp_receiver_email'>
              Email address of the person receiving the allowance:
          </label>
            <input
              required
              type='email'
              name='email_to'
              id='SignUp_receiver_email' />
          </div>
          <div>
            <button>Sign up!</button>
          </div>
        </form>
      </div>
    )
  }
}