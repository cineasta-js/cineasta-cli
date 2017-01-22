import React from 'react'
import ReactDOM from 'react-dom'
import { component as AppScene } from 'scenes/App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AppScene />, div)
});
