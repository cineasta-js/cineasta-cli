import React from 'react'
import ReactDOM from 'react-dom'
import { component as AppTake } from 'takes/app'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AppTake />, div)
});
