import React, { Component } from 'react';
import Parent from '../../components/Parent/Parent'
import Child from '../../components/Child/Child'

export default class Home extends Component {

  render() {
    let component
    const account = window.sessionStorage.getItem('account')
    if (account === '0') {
      component = <Parent
        history={this.props.history}
      />
    } else if (account === '1') {
      component = <Child />
    }
    return (
      <div>
        {component}
      </div>
    )
  }
}
