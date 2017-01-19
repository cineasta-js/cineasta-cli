const sh = require('shelljs')
const installCMD = sh.which('yarn') ? 'yarn add' : 'npm install --save'

module.exports = function installDependencies(deps) {
  return new Promise((resolve) => sh.exec(
    `${ installCMD } ${ deps.join(' ') }`,
    { silent: true, async: true },
    resolve
  ))
}
