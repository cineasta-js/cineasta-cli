module.exports = ({ name, path }) => (

`
import React from 'react'

export const path='${ path }'

export const component = () => (
  <div>
    Scene ${ name }
  </div>
)
`

)
