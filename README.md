# Planning Center JavaScript

A collection of shared components, scripts, wrappers, and forks in JavaScript.

## Packages

* [@planningcenter/helpdesk-embed](https://www.npmjs.com/package/@planningcenter/helpdesk-embed) ([project](packages/helpdesk-embed))
* [@planningcenter/url](https://www.npmjs.com/package/@planningcenter/url) ([project](packages/url))
* [@planningcenter/finder](https://www.npmjs.com/package/@planningcenter/finder) ([project](packages/finder))

## Structure

`planningcenter/javascript` is a single repository with many independent, linked NPM packages.
This is frequently referred to as a [Monorepo](https://developer.atlassian.com/blog/2015/10/monorepos-in-git/).
Projects like [babel](https://github.com/babel/babel) and [react](https://github.com/facebook/react) use this structure to manage related but independent packages.

Keeping these independent projects in one repository has one destinct advantage:
included packages can be linked for local, cross-package development.

Here's an example...

Say you're working in `@planningcenter/topbar` and need to add a feature to `@planningcenter/url`. Instead of having find that repo, clone it,, make a few blind change, publish, and re-`yarn`, you're able to develop and publish changes to both simultaniously.

## Publishing

[Lerna](https://lernajs.io) manages publishing at the root of the project.
This is big conceptual differenceMono form `1:1` package:repo projects.

A typical workflow looks like this:

* Navigate to your project in the `/packages` directory
* Develop using the scripts setup there
* Navigate back to the root and run `yarn lerna publish`
* Follow the the prompts to select a new version appropriate for your changes

Here are additional commands you might find helpful:

| Command                      | Description                                     |
| :--------------------------- | :---------------------------------------------- |
| `yarn lerna ls`              | List packages                                   |
| `yarn lerna diff`            | Diff all packages against the last release      |
| `yarn lerna diff [pkg-name]` | Diff a single package against the last release. |
| `yarn lerna publish`         | Publish all packages                            |
| `yarn lerna help`            | See all the other cool things you can do        |

#### NOTE

All commands are prefixed with `yarn`.
`npm` is not an acceptable substitute for `lerna` commands.

## Improvements

* New project generator with sensible defaults

