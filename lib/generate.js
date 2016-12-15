const fs = require('fs')
const cli = require('cli')
const sh = require('shelljs')
const kebabCase = require('lodash/kebabCase')
const camelCase = require('lodash/camelCase')
const upperFirst= require('lodash/upperFirst')
const messages = require('../config/messages')

const template = {
  scene: require('../template/scene'),
  take: require('../template/take')
}

const TYPES = ['scene', 'take']

module.exports = function generate([ type, name ], options) {
  if (! type || !TYPES.includes(type.toLowerCase())) {
    return cli.error(`${ messages.invalidType } ${ TYPES.join('/') }`)
  }

  if (!name) {
    return cli.error(`${ messages.invalidTypeName } ${ type }`)
  }

  const file = `src/${ type }s/${ upperFirst(camelCase(name)) }.js`

  cli.spinner('Generating ' + type)
  fs.writeFile(
    `${ sh.pwd() }/${ file }`,
    template[type]({
      name,
      path: kebabCase(name),
    }),
    () => cli.spinner('Generating ' + type + ': ' + file, true)
  )
}
