module.exports = ({ fileName }) => (

`
import React from 'react'
import ReactDOM from 'react-dom'
import ${ fileName } from 'container/${ fileName }'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<${ fileName } />, div)
})
`

)
