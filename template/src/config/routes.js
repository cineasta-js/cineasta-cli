import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import isFunction from 'lodash/isFunction'

const getFiles = (req) => req
  .keys()
  .filter((key) => !/\.test.js/.test(key))
  .map((key) => ({
    fileName: key,
    module: req(key)
}))

const takesReq = require.context('takes', true, /\.js$/)
const scenesReq = require.context('scenes', true, /\.js$/)

const takes = getFiles(takesReq).map(({ fileName, module }) => ({
  ...module,
  name: fileName.replace(/\.js/, '').replace('./', '').toLowerCase()
}))

const scenes = getFiles(scenesReq).map(({ fileName, module }) => (
  isFunction(module.default) ? {
    path: fileName.replace(/\.js/, '').replace('./', '/').toLowerCase(),
    component: module.default
  } : module
))

const routes = [
  ...takes
  .map((take, index) => (
    <Route key={ index } { ...take }>
      { scenes
        .filter((scene) => scene.take === take.name)
        .map((scene, index) => (
          <Route key={ index } { ...scene } />
        ))
      }
    </Route>
  )),
  ...scenes
  .filter((scene) => !scene.take)
  .map((scene, index) => (
    <Route key={ index } { ...scene } />
  ))
]

export default (
  <Router history={ browserHistory }>
    { routes }
  </Router>
)
