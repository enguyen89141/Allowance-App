import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import LandingPage from '../../routes/LandingPage/LandingPage'
import Header from '../Header/Header'
import SignUpPage from '../../routes/SignUpPage/SignUpPage';
import PublicRoute from '../Utils/PublicRoute'
import PrivateRoute from '../Utils/PrivateRoute'
import LoginPage from '../../routes/LoginPage/LoginPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import HomePage from '../../routes/Home/Home'
import ConfirmationPage from '../../routes/ConfirmationPage/ConfirmationPage'
import ChildSignUpPage from '../../routes/ChildSignUpPage/ChildSignUpPage'

export default class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className="main">
        <header>
          <Header />
        </header>
        <main>

          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            <PrivateRoute
              path={'/home'}
              component={HomePage}
            />
            <PublicRoute
              path={'/confirm'}
              component={ConfirmationPage}
            />
            <PublicRoute
              path={'/login'}
              component={LoginPage}
            />
            <PublicRoute
              path={'/parent/:parent_id'}
              component={ChildSignUpPage}
            />
            <PublicRoute
              exact
              path={'/'}
              component={LandingPage}
            />
            <PublicRoute
              path={'/signup'}
              component={SignUpPage}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div>
    )
  }
}