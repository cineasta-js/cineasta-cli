module.exports = ({ name }) => (

`
export const ${ name }Provider = (next) => (
  <${ name }>
    { next }
  </${ name }>
)
`

)
