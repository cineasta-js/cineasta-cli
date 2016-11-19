const path = require('path')
const fs = require('fs')
const zlib = require('zlib')
const tar = require('tar')
const cli = require('cli')
const shell = require('shelljs')
const request = require('request')
const messages = require('../config/messages')

const baseRepo = 'react-base-app'
const baseVersion = '0.1.1'

module.exports = function newProject([ name ], options) {
  if (name !== path.basename(name)) {
    return cli.error(messages.invalidProjectName)
  }

  if (shell.test('-d', name)) {
    return cli.error(messages.dirAlreadyTaken)
  }

  cli.info(messages.creatingDir)

  const tarUrl = `https://github.com/lucasfs7/react-base-app/archive/v${ baseVersion }.tar.gz`
  const currentDir = shell.pwd().toString()
  const projectDir = path.join(currentDir, name)
  const extractedDir = path.join(currentDir, `${ baseRepo }-${ baseVersion }`)
  const tarExtractor = tar.Extract({ path: currentDir }).on('end', finishIt)

  request(tarUrl)
    .pipe(zlib.createGunzip())
    .pipe(tarExtractor)

  function finishIt() {
    shell.mv(extractedDir, projectDir)
    cli.info('finished!')
  }
}
