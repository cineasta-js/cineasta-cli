const path = require('path')
const fs = require('fs')
const cli = require('cli')
const sh = require('shelljs')
const messages = require('../config/messages')
const templateDir = path.join(__dirname, '../', 'template')
const totalSteps = 3
const extraDependencies = [
  'react-router',
  'lodash',
]

sh.config.silent = true

module.exports = function newProject([ name ], options) {
  const projectDir = path.join(sh.pwd().toString(), name)

  start(messages.generatingProject, 1)
  sh.exec(`create-react-app ${ name }`, {
    silent: true,
    async: true,
  }, () => {
    const projectPkg = require(`${ projectDir }/package.json`)
    end(messages.generatingProject, 1)

    start(messages.copyingTemplate, 2)
    sh.cp('-Rf', `${ templateDir }/*`, projectDir)
    projectPkg.scripts.start = `NODE_PATH=./src ${ projectPkg.scripts.start }`
    projectPkg.scripts.build= `NODE_PATH=./src ${ projectPkg.scripts.build }`
    projectPkg.scripts.test= `NODE_PATH=./src ${ projectPkg.scripts.test }`
    fs.writeFileSync(
      `${ projectDir }/package.json`,
      JSON.stringify(projectPkg, null, 2)
    )
    sh.cd(projectDir)
    sh.exec(`npm install --save ${ extraDependencies.join(' ') }`, {
      silent: true,
      async: true
    }, () => {
      sh.cd('../')
      end(messages.copyingTemplate, 2)

      start(messages.removingFiles, 3)
      sh.rm(
        `${ projectDir }/src/App.js`,
        `${ projectDir }/src/App.test.js`,
        `${ projectDir }/src/App.css`,
        `${ projectDir }/src/logo.svg`
      )
      end(messages.removingFiles, 3)
    })
  })
}

function start(message, step) {
  cli.spinner(`[${ step }/${ totalSteps }] ${ message }...`)
}

function end(message, step) {
  cli.spinner(`[${ step }/${ totalSteps }] ${ message }: done`, true)
}
