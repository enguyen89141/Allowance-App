import React from 'react'
import ReactDOM from 'react-dom'
import Child from '../Child/Child'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Child />, div);
  ReactDOM.unmountComponentAtNode(div);
});