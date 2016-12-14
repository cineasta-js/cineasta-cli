import React from 'react'
import ReactDOM from 'react-dom'
import { component as IndexScene } from 'scenes/index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<IndexScene />, div)
});
