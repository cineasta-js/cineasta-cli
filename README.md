![cineastaJS](https://github.com/cineasta-js/brand/raw/master/logos/logo-transparent.png)

The CLI for the cineastaJS framework

---

### What?

CineastaJS uses `create-react-app` to generate a React app structure, and then, add some features to make your life esier:
- plugued with `react-router`
- automatic page (scene) routing
- require/import from relative paths (src)
- possibility to group scenes as takes (with grouped scenes you can have a wrapper component for multiple routes)
- cli commands for creating app and generating specific parts of the app

### How?

CineastaJS is a framework on top of `create-react-app`, so you have to install it too.

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

and name whatever you want to call it

## Directory structure

This is very important because the routing is based on this structure.
Besides the structure of [create-react-app](https://github.com/facebookincubator/create-react-app#creating-an-app), you'll have the following:

```
my-app
  |-- src
  |   |-- config
  |   |     |-- routes.js
  |   |-- scenes
  |   |     |-- index.js
  |   |-- takes
  |   |--   |-- app.js
  |   |-- index.js
```

`src/index.js` and `src/config/routes.js` is where we do our magic, and you don't need to worry about editing them

### src/config

All kinds of app configurations, including the routes

### src/scenes

The scenes are the pages of the app, each scene is attached to a route. There are two ways to create a scene:

Exporting a component by default (this way the route path will match file name):
```js
// src/scenes/b.js

import React from 'react'

export default () => (
  <div>Page A</div>
)
```

Exporting the route props (with this way, it's possible to create a custom route):
```js
// src/scenes/a.js

import React from 'react'

export const path = '/b'

export const component = () => (
  <div>Page B</div>
)
```

### src/takes

The take act like a scenes wrapper, where it's possible to group scenes under the same wrapper component:
```js
// src/takes/app.js

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
