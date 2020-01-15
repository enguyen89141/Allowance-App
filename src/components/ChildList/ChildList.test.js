import React from 'react'
import ReactDOM from 'react-dom'
import ChildList from '../ChildList/ChildList'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChildList />, div);
  ReactDOM.unmountComponentAtNode(div);
});