/*
 * install redux and react-redux
 * generate redux provider
 * generate redux store
 * */

const providerTemplate = require('../provider')
const name = 'ReduxProvider'
const props = { store: 'configureStore()' }

module.exports = () => (

`
import { Provider as ${ name } } from 'react-redux'
import configureStore from 'config/store'
${ providerTemplate({ name, props }) }

`

)
