![cineastaJS](https://github.com/cineasta-js/brand/raw/master/logos/logo-transparent.png)

---

### What?

cineastaJS uses `create-react-app` to generate a React app structure, and then, add some features to make your life esier:
- plugued with `react-router`
- automatic page (take) routing
- require/import from relative paths (src)
- possibility to group takes as scenes (with grouped scenes you can have a wrapper component for multiple routes)
- cli commands for creating app and generating specific parts of the app

### How?

cineastaJS is a framework on top of `create-react-app`, so you have to install it too.

```
$ yarn global add create-react-app cineasta-cli
```

and then simply

```
$ cineasta new my-app
$ cd my-app
$ yarn run start
```

### Generating

To generate a new part for your app, you can just type (inside project's directory):
```
$ cineasta g <type> <name>
```
where type can be:
- scene
- take
- component
- container
- provider
- redux
- reducer
- routes

and name whatever you want to call it

## Directory structure

This is very important because the routing is based on this structure.
Besides the structure of [create-react-app](https://github.com/facebookincubator/create-react-app#creating-an-app), you'll have the following:

```
my-app
  |-- src
  |   |-- config
  |   |     |-- routes.js
  |   |     |-- initializers.js
  |   |     |-- providers.js
  |   |-- scenes
  |   |--   |-- app.js
  |   |-- takes
  |   |     |-- index.js
  |   |-- index.js
```

`src/index.js` and `src/config/routes.js` is where we do our magic, and you don't need to worry about editing them

### src/config

All kinds of app configurations, including the routes and initializers and providers

## src/config/initializers.js

Import anything you want to expose globally to your app, like a CSS framework for example

## src/config/providers.js

Define here the providers your app need, like redux provider for example:
```js
import { Provider } from 'react-redux'
import configureStore from 'config/store'

export const reduxProvider = (next) => (
  <Provider store={ configureStore() }>
    { next }
  </Provider>
)
```

You can export as many provider as you need

### src/scenes

The scene act like a wrapper, where it's possible to group takes under the same wrapper component:
```js
// src/scene/app.js

export const onEnter = () => {
  /* here can go auth logic to allow/block all scenes that point to this take */
}

export const component = (props) => (
  <div>
    <div>Here goes some header/nav</div>
    { props.children }
  </div>
)
```

### src/takes

The takes are like the pages of the app, each take is attached to a route. There are two ways to create a take:

Exporting a component by default (this way the route path will match file name):
```js
// src/takes/b.js

import React from 'react'

export default () => (
  <div>Take B</div>
)
```

Exporting the route props (with this way, it's possible to create a custom route):
```js
// src/takes/a.js

import React from 'react'

export const path = '/b'

export const component = () => (
  <div>Take B</div>
)
```

### Redux

When you generate redux, cineasta prepare for you the necessary dependencies, connects the provider and creates the store where all reducer importing and combining will live. You don't need to worry with this file, cineasta will take care of everything.

#### Reducer

Once you generated redux, you can start generating the reducers. When you generate a reducer, a single file will be created inside `src/reducers` directory where all your actions and the reducer will live. The file will be started with a sample action and you can play with it all you want.

To easy your life, cineasta uses the great `redux-actions` to create and handle anything inside your reducer.

The reducer structure is:
```js
import { createAction, handleActions } from 'redux-actions'

export const name = 'myReducer'

const initialState = {
  loading: false,
  data: {},
}

export const request = createAction(
  'REQUEST'
)

export default handleActions({
  [request]: (state) => ({
    ...state,
    loading: true,
  }),
}, initialState)
```
