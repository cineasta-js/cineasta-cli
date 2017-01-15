import 'config/initializers'

import ReactDOM from 'react-dom'
import * as providers from 'config/providers'
import routes from 'config/routes'

ReactDOM.render(
  Object
    .keys(providers)
    .filter((key) => key !== 'default')
    .reduce((next, provider) => providers[provider](next), routes),
  document.getElementById('root')
)
