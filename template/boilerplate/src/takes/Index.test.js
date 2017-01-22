import React from 'react'
import ReactDOM from 'react-dom'
import { component as IndexTake } from 'takes/Index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<IndexTake />, div)
});
