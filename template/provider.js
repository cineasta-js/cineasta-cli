module.exports = ({ name, props }) => (

`
export const ${ name }Provider = (next) => (
  <${ name } ${ Object.keys(props).map(p => `${ p }={ ${ props[p] } }`).join(' ') }>
    { next }
  </${ name }>
)
`

)
