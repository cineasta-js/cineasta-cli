import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import middlewares from 'config/reduxMiddlewares'

const reducersReq = require.context('reducers', false, /\.js$/)

const rootReducer = combineReducers(
  reducersReq
  .keys()
  .filter((key) => !/\.test.js/.test(key))
  .map((key) => reducersReq(key))
  .reduce((memo, module) => ({ ...memo, [module.name]: module.default }), {})
)

export default (initialState) => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ),
)
