module.exports = ({ name }) => (

`
import { createAction, handleActions } from 'redux-actions'

export const name = '${ name }'

const initialState = {
  loading: false,
  data: {},
}

export const request = createAction(
  'REQUEST'
)

export default handleActions({
  [request]: (state) => ({
    ...state,
    loading: true,
  }),
}, initialState)
`

)
