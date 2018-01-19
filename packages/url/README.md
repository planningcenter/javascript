# pco-url
A dumb url origin generator in JS.

Builds environment-considered url origins in JS-land, for Planning Center apps.

## Examples
```js
pcoUrl("development")("api")
// => "http://api.pco.test"

pcoUrl("staging")("people")
// => "https://accounts.planningcenteronline.com"

pcoUrl("production")("accounts")
// => "https://people-staging.planningcenteronline.com"
```

Arguments are curried.
You can make a generic env-considered function.

```js
const envPcoUrl = pcoUrl(window.railsEnv)
envPcoUrl("api")
```

## In Planning Center Apps
Planning center apps expose the Rails env as the JS global `railsEnv`. Use like so.

```js
pcoUrl(railsEnv)("api")
```

## Fetching example
```js
fetch(`${pcoEnvUrl(env)("api")}/people/v2/me`, {
  credentials: "include",
})
  .then(res => res.json())
  .then(json => json.data)
  .then(({ id, attributes }) =>
    this.setState({
      currentUser: {
        id,
        ...attributes,
      },
    })
  )
  .catch(err => console.log(err));

```

## Installation
Script tag on Rails
```html
<script type="javascript" src="https://unpkg.com/pco-url@1.0.0/lib/pco-url.js"></script>
<!-- exposed as global `pcoUrl` -->
```

Webpacker on Rails
```bash
yarn add pco-url
```

```js
/* global railsEnv */
import pcoUrl from "pco-url"

pcoUrl(railsEnv)("api")
```
