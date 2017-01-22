module.exports = ({ name, path }) => (

`
import React from 'react'

export const path = '${ path }'

export const component = (props) => (
  <div>
    <h1>${ name } Scene</h1>
    { props.children }
  </div>
)
`

)
