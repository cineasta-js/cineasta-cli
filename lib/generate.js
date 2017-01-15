const fs = require('fs')
const cli = require('cli')
const sh = require('shelljs')
const kebabCase = require('lodash/kebabCase')
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')
const before = require('lodash/before')
const messages = require('../config/messages')

const template = {
  scene: {
    component: require('../template/scene'),
    test: require('../template/scene.test'),
  },
  take: {
    component: require('../template/take'),
    test: require('../template/take.test'),
  },
  component: {
    component: require('../template/component'),
    test: require('../template/component.test'),
  },
  container: {
    component: require('../template/component'),
    test: require('../template/component.test'),
  },
}

const TYPES = ['scene', 'take', 'component', 'container']

module.exports = function generate([ type, name ], options) {
  if (! type || !TYPES.includes(type.toLowerCase())) {
    return cli.error(`${ messages.invalidType } ${ TYPES.join('/') }`)
  }

  if (!name) {
    return cli.error(`${ messages.invalidTypeName } ${ type }`)
  }

  const fileDir = `src/${ type }s`
  const fileName = upperFirst(camelCase(name))
  const filePath = `${ fileDir }/${ fileName }.js`
  const testFilePath = `${ fileDir }/${ fileName }.test.js`
  const routePath = kebabCase(name)

  const finished = before(2, () => {
    cli.spinner(`Generating ${ type }: done `, true)
    cli.info(filePath)
    cli.info(testFilePath)
  })

  if (!sh.test('-d', `${ sh.pwd() }/${ fileDir }`)) {
    sh.mkdir(`${ sh.pwd() }/${ fileDir }`)
  }

  cli.spinner('Generating ' + type)
  fs.writeFile(
    `${ sh.pwd() }/${ filePath }`,
    template[type].component({ name, fileName, path: routePath }),
    finished
  )
  fs.writeFile(
    `${ sh.pwd() }/${ testFilePath }`,
    template[type].test({ fileName }),
    finished
  )
}
