const cli = require('cli')
const config = require('./package.json')
const newProject = require('./lib/newProject')

cli.setApp(config.name, config.version)
cli.enable('help', 'version', 'status')

cli.parse(
  null,
  [ 'new' ]
)

cli.main((args, options) => {
  switch (cli.command) {
    case 'new':
      return newProject(args, options)
  }
})

