# Beanbag-ESLint-Plugin Releases

## Version 3.0.0 (TBD)

* Updated for ESLint 9.x.


## Version 2.0.1 (1-April-2024)

* Triple-slash comments (used for TypeScript) no longer trigger a lint warning.


## Version 2.0 (26-February-2024)

* Added rules specific to [Storybook](https://storybook.js.org/).

  Storybook "Story" files no longer require object keys to be in any specific
  order. This helps maintain a standard flow to these files.

* Added support for correctly linting JSX files.

  `*.jsx` and `*.tsx` files no longer show errors where JSX is used.

* Bumped our [typescript-eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
  plugin to 7.x (7.1.0+).


## Version 1.0.2 (28-November-2023)

* Removed warnings about unused function arguments.


## Version 1.0.1 (5-May-2023)

* Fixed warnings about comments at the top of TypeScript `interfaces`.


## Version 1.0 (8-January-2023)

* Initial release
