# Beanbag ESLint Plugin

We write a lot of JavaScript at [Beanbag](https://www.beanbaginc.com), and need
to keep our repositories in tip-top shape. This includes sticking to consistent
standards and catching problems *before* they go
[up for review](https://www.reviewboard.org).

To help with this, we've created `beanbag-eslint-plugin`, our set of standard
[ESLint](https://eslint.org/) rules for ES5, ES6, and TypeScript codebases.


## Installation

To install this plugin:

```
npm install --save-dev @beanbag/eslint-plugin
```


## Usage

There are several configurations and environments provided by the plugin, but
we recommend starting with the `@beanbag/recommended` configuration. This can
be enabled in your `.eslintrc` file:

```json
{
    "plugins": ["@beanbag"],
    "extends": [
        "plugin:@beanbag/recommended"
    ]
}
```


## Configurations

### @beanbag/recommended

This ruleset automatically enables the following additional configurations:

* `@beanbag/es5`: ES5 rules for `*.js` files
* `@beanbag/es6`: ES6 rules for `*.es6.js` files
* `@beanbag/typescript`: TypeScript rules for `*.ts` files


### @beanbag/es5

A set of default rules for all JavaScript/TypeScript code, written to be
aggressively browser-safe.


### @beanbag/es6

A set of rules enabling ES6-level JavaScript code, useful for modern JavaScript
(including code being processed by [Babel](https://babeljs.io/).


### @beanbag/typescript

A set of rules for developing TypeScript code.


## Environments

The following environments are available:

* `@beanbag/backbone`: Records `Backbone` and `_` as read-only globals, for
  use with [Backbone](https://backbonejs.org/).

* `@beanbag/django`: Records `django`, `gettext`, `gettext_noop`,
  `interpolate`, `ngettext`, `npgettext`, and `pgettext` as read-only globals,
  for use with [Django](https://www.djangoproject.com/).

* `@beanbag/djblets`: Records `Djblets` as a read-only global, for use with
  [Djblets](https://github.com/djblets/djblets/).

* `@beanbag/jasmine-suites`: Records `suite` as a read-only global, for use
  with [jasmine-suites](https://github.com/beanbaginc/jasmine-suites).

* `@beanbag/reviewboard`: Records `RB` as a read-only global, for use in
  [Review Board](https://github.com/reviewboard/reviewboard) extensions.
