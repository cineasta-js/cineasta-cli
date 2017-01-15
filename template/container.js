module.exports = ({ name, fileName }) => (

`
import React from 'react'

const ${ fileName } = (props) => (
  <div>
    Container ${ name }
  </div>
)

export default ${ fileName }
`

)
