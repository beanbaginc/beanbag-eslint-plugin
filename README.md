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
be enabled in your `eslint.config.mjs` file:

```js
import beanbag from '@beanbag/eslint-plugin';
import { defineConfig } from 'eslint/config';


export default defineConfig([
    beanbag.configs.recommended,
    {
        plugins: {
            '@beanbag': beanbag,
        },
    },
]);
```


## Configurations

### beanbag.configs.recommended

This ruleset automatically enables the following additional configurations:

* `beanbag.configs.es5`: ES5 rules for `*.js` files.
* `beanbag.configs.es6`: ES6 rules for `*.es6.js` files.
* `beanbag.configs.typescript`: TypeScript rules for `*.ts` files.
* `beanbag.configs.jsx`: Rules for JSX files.
* `beanbag.configs.jasmine`: Rules for Jasmine test suites.
* `beanbag.configs.storybook`: Rules for Storybook stories.


### beanbag.configs.es5

A set of default rules for all JavaScript/TypeScript code, written to be
aggressively browser-safe.


### beanbag.configs.es6

A set of rules enabling ES6+ JavaScript code, useful for modern JavaScript
(including code being processed by [Babel](https://babeljs.io/).


### beanbag.configs.typescript

A set of rules for developing TypeScript code.


## Globals

Several sets of globals are also provided within the plugin. These may be
already added to `languageOptions` depending on which rulesets are enabled, but
are also available for your use:

* `beanbag.globals.backbone`: Provides read-only globals configuration for
  `Backbone` and `_`, for use with [Backbone](https://backbonejs.org/).

* `beanbag.globals.django`: Provides read-only globals for `django`, `gettext`,
  `gettext_noop`, `interpolate`, `ngettext`, `npgettext`, and `pgettext`,
  for use with [Django](https://www.djangoproject.com/).

* `beanbag.globals.djblets`: Provides a read-only global for `Djblets`, for
  use with [Djblets](https://github.com/djblets/djblets/).

* `beanbag.globals.reviewboard`: Provides a read-only global for `RB` , for
  use in [Review Board](https://github.com/reviewboard/reviewboard) extensions.
