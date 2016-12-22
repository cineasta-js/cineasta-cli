module.exports = ({ fileName }) => (

`
import React from 'react'
import ReactDOM from 'react-dom'
import { component as ${ fileName }Scene } from 'scenes/${ fileName }'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<${ fileName }Scene />, div)
})
`

)
