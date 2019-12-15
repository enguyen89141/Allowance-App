import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import LandingPage from '../../routes/LandingPage/LandingPage'
import Header from '../Header/Header'
import AllowanceGiverPage from '../../routes/AllowanceGiverPage/AllowanceGiverPage'
import SignUpPage from '../../routes/SignUpPage/SignUpPage';
import AllowanceReceiverPage from '../../routes/AllowanceReceiverPage/AllowanceReceiverPage';

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
          <Route
            exact
            path={'/'}
            component={LandingPage}
            />
          <Route
            path={'/allowancegiver'}
            component={AllowanceGiverPage}
            />
          <Route
            path={'/signup'}
            component={SignUpPage}
            />
          <Route
            path={'/allowancereceiver'}
            component={AllowanceReceiverPage}
            />
        </Switch>
      </main>
      </div>
    )
  }
}