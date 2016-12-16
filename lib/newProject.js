const path = require('path')
const fs = require('fs')
const cli = require('cli')
const sh = require('shelljs')
const messages = require('../config/messages')
const templateDir = path.join(__dirname, '..', 'template')
const totalSteps = 3
const installCMD = sh.which('yarn') ? 'yarn add' : 'npm install --save'

const project = {
  extraDependencies: [
    'react-router',
    'lodash',
  ]
}

module.exports = function newProject([ name ], options) {
  if (!sh.which('create-react-app')) {
    return cli.error(messages.noCreateReactApp)
  }

  project.name = name
  project.dir = path.join(sh.pwd().toString(), name)

  generateProject()
}

function generateProject() {
  start(messages.generatingProject, 1)
  sh.exec(`create-react-app ${ project.name }`, {
    silent: true,
    async: true,
  }, () => {
    end(messages.generatingProject, 1)
    configureProject()
  })
}

function configureProject() {
  project.pkg = require(`${ project.dir }/package.json`)

  start(messages.copyingTemplate, 2)
  sh.cp('-Rf', `${ templateDir }/boilerplate/*`, project.dir)
  project.pkg.scripts.start = `NODE_PATH=./src ${ project.pkg.scripts.start }`
  project.pkg.scripts.build= `NODE_PATH=./src ${ project.pkg.scripts.build }`
  project.pkg.scripts.test= `NODE_PATH=./src ${ project.pkg.scripts.test }`
  fs.writeFileSync(
    `${ project.dir }/package.json`,
    JSON.stringify(project.pkg, null, 2)
  )
  sh.cd(project.dir)
  sh.exec(`${ installCMD } ${ project.extraDependencies.join(' ') }`, {
    silent: true,
    async: true
  }, () => {
    sh.cd('../')
    end(messages.copyingTemplate, 2)
    cleaningUp()
  })
}

function cleaningUp() {
  start(messages.removingFiles, 3)
  sh.rm(
    `${ project.dir }/src/index.css`,
    `${ project.dir }/src/App.js`,
    `${ project.dir }/src/App.test.js`,
    `${ project.dir }/src/App.css`,
    `${ project.dir }/src/logo.svg`
  )
  end(messages.removingFiles, 3)
}

function start(message, step) {
  cli.spinner(`[${ step }/${ totalSteps }] ${ message }...`)
}

function end(message, step) {
  cli.spinner(`[${ step }/${ totalSteps }] ${ message }: done`, true)
}
