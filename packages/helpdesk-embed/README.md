# @planningcenter/helpdesk-embed

App-side iframe loader for Planning Center Helpdesk.

## Rails Installation

Add this [Sprockets](https://github.com/rails/sprockets)require to `application.js` in any Planning Center app.

```js
//= require @planningcenter/helpdesk-embed
```

`helpdesk-embed` is an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) that adds `Helpdesk` to the global object.

### Rails can't find `helpdesk-embed`

All flagship Planning Center apps are setup to consume `node_modules` in for assets.
If your app isn't (or you're creating a new app) add this to `config/initializers/assets.rb`:

```rb
Rails.application.config.assets.paths << Rails.root.join('node_modules')
```

## Areas for improvement

This code was written a long time ago, before JavaScript had modules.
It'd be great if this code were modularized, making all dependencies (internal and external) more explicit.
