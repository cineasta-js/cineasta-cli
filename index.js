#!/usr/bin/env node

'use strict'

const cli = require('cli')
const config = require('./package.json')
const newProject = require('./lib/newProject')
const generate = require('./lib/generate')

cli.setApp(config.name, config.version)
cli.enable('help', 'version', 'status')

cli.parse(
  null,
  [ 'new', 'generate', 'g' ]
)

cli.main((args, options) => {
  switch (cli.command) {
    case 'new':
      return newProject(args, options)
    case 'generate':
      return generate(args, options)
    case 'g':
      return generate(args, options)
  }
})

