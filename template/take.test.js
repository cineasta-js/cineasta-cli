module.exports = ({ fileName }) => (

`
import React from 'react'
import ReactDOM from 'react-dom'
import { component as ${ fileName }Take } from 'takes/${ fileName }'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<${ fileName }Take />, div)
})
`

)
